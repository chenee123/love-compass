import { useState } from 'react'
import { QUESTIONS, DIMENSIONS } from '../../data/questions'
import { PillButton } from '../../components/ui'
import type { AnswerMap } from '../../types'

interface QuizProps {
  answers: AnswerMap
  onAnswer: (questionId: string, optionId: string) => void
  onFinish: () => void
  onRestart: () => void
}

export function Quiz({ answers, onAnswer, onFinish, onRestart }: QuizProps) {
  const [current, setCurrent] = useState(() => {
    // 恢复时定位到第一道未作答的题
    const firstUnanswered = QUESTIONS.findIndex((q) => !answers[q.id])
    return firstUnanswered === -1 ? QUESTIONS.length - 1 : firstUnanswered
  })

  const total = QUESTIONS.length
  const question = QUESTIONS[current]
  const selectedId = answers[question.id]
  const dimension = DIMENSIONS.find((d) => d.id === question.dimension)
  const isLast = current === total - 1
  const progress = Math.round((current / total) * 100)

  const choose = (optionId: string) => {
    onAnswer(question.id, optionId)
  }

  const next = () => {
    if (!selectedId) return
    if (isLast) {
      onFinish()
    } else {
      setCurrent((c) => c + 1)
    }
  }

  const prev = () => {
    setCurrent((c) => Math.max(0, c - 1))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-5 pt-6 pb-3">
        <button
          onClick={onRestart}
          className="text-sm text-plum/60 hover:text-plum transition-colors"
        >
          ✕ 重新开始
        </button>
        <span className="text-sm font-semibold text-plum tabular-nums">
          {String(current + 1).padStart(2, '0')}
          <span className="text-plum/40">/{String(total).padStart(2, '0')}</span>
        </span>
      </header>

      {/* 进度条 */}
      <div className="px-5 pb-4">
        <div className="h-2 w-full rounded-full bg-blush overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose to-pink transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        {dimension && (
          <div className="mt-2 text-[11px] text-rose/70">
            维度 · {dimension.name}
          </div>
        )}
      </div>

      <main className="flex-1 flex flex-col px-5 pb-8 max-w-lg mx-auto w-full">
        <div key={question.id} className="slide-in flex-1 flex flex-col">
          <h1 className="text-xl font-bold text-plum leading-snug mb-6 mt-4">
            {question.title}
          </h1>

          <div className="flex flex-col gap-3">
            {question.options.map((opt) => {
              const active = selectedId === opt.id
              return (
                <button
                  key={opt.id}
                  onClick={() => choose(opt.id)}
                  className={`text-left rounded-2xl px-5 py-4 transition-all duration-150 border-2 active:scale-[0.98] ${
                    active
                      ? 'bg-pink/15 border-rose text-plum shadow-soft'
                      : 'bg-white border-transparent text-body/80 hover:border-pink/40 shadow-card'
                  }`}
                >
                  <span className="text-base leading-relaxed">{opt.text}</span>
                  {active && (
                    <span className="ml-2 inline-block text-rose">✓</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <PillButton
            onClick={prev}
            variant="ghost"
            className="flex-1 py-3.5"
            disabled={current === 0}
          >
            上一题
          </PillButton>
          <PillButton
            onClick={next}
            className="flex-[2] py-3.5"
            disabled={!selectedId}
          >
            {isLast ? '生成我的婚恋报告 ♡' : '下一题'}
          </PillButton>
        </div>
      </main>
    </div>
  )
}
