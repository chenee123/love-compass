import { useCallback, useState } from 'react'
import type { AnswerMap, ReportResult } from '../types'
import { generateReport } from '../engine/reportGenerator'

const STORAGE_KEY = 'love-compass:answers'

export type QuizPhase = 'home' | 'quiz' | 'result' | 'about'

function loadAnswers(): AnswerMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object') return parsed as AnswerMap
    return {}
  } catch {
    return {}
  }
}

function saveAnswers(answers: AnswerMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
  } catch {
    // 存储不可用时静默失败，不影响答题流程
  }
}

function clearAnswers() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

export function useQuiz() {
  const [phase, setPhase] = useState<QuizPhase>('home')
  const [answers, setAnswers] = useState<AnswerMap>(() => loadAnswers())
  const [report, setReport] = useState<ReportResult | null>(null)

  const startQuiz = useCallback(() => {
    clearAnswers()
    setAnswers({})
    setReport(null)
    setPhase('quiz')
  }, [])

  const resumeQuiz = useCallback(() => {
    setReport(null)
    setPhase('quiz')
  }, [])

  const answerQuestion = useCallback((questionId: string, optionId: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: optionId }
      saveAnswers(next)
      return next
    })
  }, [])

  const finishQuiz = useCallback(() => {
    setAnswers((prev) => {
      const result = generateReport(prev)
      setReport(result)
      return prev
    })
    setPhase('result')
  }, [])

  const restart = useCallback(() => {
    clearAnswers()
    setAnswers({})
    setReport(null)
    setPhase('home')
  }, [])

  const clearLocalData = useCallback(() => {
    clearAnswers()
    setAnswers({})
    setReport(null)
  }, [])

  return {
    phase,
    setPhase,
    answers,
    report,
    startQuiz,
    resumeQuiz,
    answerQuestion,
    finishQuiz,
    restart,
    clearLocalData,
  }
}
