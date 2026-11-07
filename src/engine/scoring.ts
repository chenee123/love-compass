import { QUESTIONS } from '../data/questions'
import type { AnswerMap, DimensionId, DimensionScore } from '../types'

/**
 * 计分算法
 *
 * 每个维度有 4 道题。每道题的选项 score 记录了它对 5 个维度的倾向分值（0~3）。
 * 这里把某维度下的 4 道题得分求和，再归一化到 0~100。
 *
 * 归一化方式：
 *   维度原始分 = 该维度下 4 道题所选选项在该维度上的分值之和
 *   理论上限   = 该维度下 4 道题中，每个维度分值的最大可能值之和
 *   归一化     = round((原始分 / 理论上限) * 100)
 *
 * 理论上限按每题该维度最大分值动态计算，保证不同题目权重下仍能正确归一化，
 * 且永远落在 0~100 之间，不会出现 NaN / 除零（理论上限恒 > 0，因为每维度都有至少一道题）。
 */

// 每个维度的 4 道题（按题目顺序天然分组）
function questionsOfDimension(dimension: DimensionId) {
  return QUESTIONS.filter((q) => q.dimension === dimension)
}

// 计算某个维度理论上限
function dimensionMax(dimension: DimensionId): number {
  return questionsOfDimension(dimension).reduce((sum, q) => {
    const maxForQuestion = q.options.reduce(
      (m, opt) => Math.max(m, opt.score[dimension]),
      0,
    )
    return sum + maxForQuestion
  }, 0)
}

// 从答题结果中计算某个维度的原始分
function dimensionRaw(dimension: DimensionId, answers: AnswerMap): number {
  return questionsOfDimension(dimension).reduce((sum, q) => {
    const chosenOptionId = answers[q.id]
    if (!chosenOptionId) return sum // 未作答的题计 0，避免 NaN
    const option = q.options.find((o) => o.id === chosenOptionId)
    if (!option) return sum
    return sum + (option.score[dimension] || 0)
  }, 0)
}

/**
 * 计算五个维度的 0~100 得分
 * @param answers 用户答题结果
 * @returns 五个维度得分数组
 */
export function calculateScores(answers: AnswerMap): DimensionScore[] {
  const dimensions: DimensionId[] = [
    'goal',
    'standard',
    'self',
    'relate',
    'reality',
  ]

  return dimensions.map((dimension) => {
    const max = dimensionMax(dimension)
    const raw = dimensionRaw(dimension, answers)
    // 防御：max 恒 > 0，但保留兜底，避免极端情况下除零
    const value = max > 0 ? Math.round((raw / max) * 100) : 0
    return { dimension, value: Math.max(0, Math.min(100, value)) }
  })
}
