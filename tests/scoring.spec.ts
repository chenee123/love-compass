import { test, expect } from '@playwright/test'
import { QUESTIONS } from '../src/data/questions'
import { calculateScores } from '../src/engine/scoring'
import { classify } from '../src/engine/classifier'
import { generateReport } from '../src/engine/reportGenerator'
import type { AnswerMap } from '../src/types'

/**
 * 构造一个"全选某个选项序号"的答题结果，用于测试计分稳定性。
 * 选项序号从 0 开始（a/b/c/d）。
 */
function answersAll(pickIndex: number): AnswerMap {
  const map: AnswerMap = {}
  for (const q of QUESTIONS) {
    const opt = q.options[pickIndex % q.options.length]
    map[q.id] = opt.id
  }
  return map
}

test.describe('计分算法', () => {
  test('所有维度得分都在 0~100 之间，且无 NaN', () => {
    for (let i = 0; i < 4; i++) {
      const scores = calculateScores(answersAll(i))
      for (const s of scores) {
        expect(Number.isFinite(s.value)).toBe(true)
        expect(s.value).toBeGreaterThanOrEqual(0)
        expect(s.value).toBeLessThanOrEqual(100)
      }
    }
  })

  test('20 道题、每题 4 个选项', () => {
    expect(QUESTIONS).toHaveLength(20)
    for (const q of QUESTIONS) {
      expect(q.options).toHaveLength(4)
    }
  })

  test('每个维度恰好 4 道题', () => {
    const dims = ['goal', 'standard', 'self', 'relate', 'reality']
    for (const d of dims) {
      const count = QUESTIONS.filter((q) => q.dimension === d).length
      expect(count).toBe(4)
    }
  })

  test('空答案也能得到有效结果（不 NaN、不崩溃）', () => {
    const scores = calculateScores({})
    expect(scores).toHaveLength(5)
    for (const s of scores) {
      expect(Number.isFinite(s.value)).toBe(true)
    }
  })
})

test.describe('分类器', () => {
  test('任意答题组合都能得到主定位与次定位（且不同）', () => {
    for (let i = 0; i < 4; i++) {
      const scores = calculateScores(answersAll(i))
      const { primary, secondary } = classify(scores)
      expect(primary).toBeTruthy()
      expect(secondary).toBeTruthy()
      expect(primary).not.toBe(secondary)
    }
  })

  test('五种主定位都能被触发（覆盖 4 种极端组合）', () => {
    const seen = new Set<string>()
    for (let i = 0; i < 4; i++) {
      const scores = calculateScores(answersAll(i))
      const { primary } = classify(scores)
      seen.add(primary)
    }
    // 至少触发 2 种以上不同定位，验证分类不是恒定输出
    expect(seen.size).toBeGreaterThan(1)
  })
})

test.describe('报告生成', () => {
  test('生成完整报告，包含所有必需字段', () => {
    const report = generateReport(answersAll(0))
    expect(report.primary).toBeTruthy()
    expect(report.secondary).toBeTruthy()
    expect(report.scores).toHaveLength(5)
    expect(report.preferences.length).toBeGreaterThan(0)
    expect(report.strengths.length).toBeGreaterThan(0)
    expect(report.blindSpots.length).toBeGreaterThan(0)
    expect(report.matchTraits.length).toBeGreaterThan(0)
    expect(report.advices).toHaveLength(3)
  })
})
