import { getArchetype } from '../data/results'
import type {
  AnswerMap,
  DimensionId,
  DimensionScore,
  ReportResult,
} from '../types'
import { classify } from './classifier'
import { calculateScores } from './scoring'

/**
 * 报告生成器：把答题结果组合成完整报告。
 *
 * 通过主定位 + 次定位 + 五维得分，动态组合出有差异的内容，
 * 避免不同用户得到完全相同的报告。
 */

const DIMENSION_ORDER: DimensionId[] = [
  'goal',
  'standard',
  'self',
  'relate',
  'reality',
]

// 每个维度对应的"亮点"与"提醒"文案，用于按得分高低动态补充
const DIMENSION_INSIGHT: Record<
  DimensionId,
  { high: string; low: string; name: string }
> = {
  goal: {
    name: '婚恋目标',
    high: '你对关系有着清晰的方向感，知道自己想要什么。',
    low: '你对关系的走向偏随性，更愿意让答案顺其自然地浮现。',
  },
  standard: {
    name: '择偶标准',
    high: '你的择偶标准明确而稳定，不容易被一时好感动摇。',
    low: '你更看重相处的感觉，标准的弹性较大。',
  },
  self: {
    name: '自我认知',
    high: '你对自己有清晰的认知，独立而完整。',
    low: '你更愿意在关系中去确认和探索自己。',
  },
  relate: {
    name: '关系相处',
    high: '你重视互动与回应，善于经营关系里的温度。',
    low: '你更偏好留有余地的相处，不习惯过度黏着。',
  },
  reality: {
    name: '现实适配',
    high: '你很看重现实的匹配，会用理性的眼光打量长期生活。',
    low: '你更愿意跟着感觉走，把现实问题交给时间。',
  },
}

// 找到最高与最低维度，用于生成个性化描述
function extremeDimensions(scores: DimensionScore[]) {
  const sorted = [...scores].sort((a, b) => b.value - a.value)
  return { highest: sorted[0], lowest: sorted[sorted.length - 1] }
}

export function generateReport(answers: AnswerMap): ReportResult {
  const scores = calculateScores(answers)
  const { primary: primaryId, secondary: secondaryId } = classify(scores)

  const primary = getArchetype(primaryId)
  const secondary = getArchetype(secondaryId)

  const { highest, lowest } = extremeDimensions(scores)
  const highestInsight = DIMENSION_INSIGHT[highest.dimension]
  const lowestInsight = DIMENSION_INSIGHT[lowest.dimension]

  // 组合优势：主定位优势 + 最高维度的个性化补充
  const strengths = [
    ...primary.strengths,
    `${highestInsight.name}是你最突出的维度：${highestInsight.high}`,
  ]

  // 组合盲区：主定位盲区 + 最低维度的个性化补充
  const blindSpots = [
    ...primary.blindSpots,
    `${lowestInsight.name}相对是你需要留意的方向：${lowestInsight.low}`,
  ]

  return {
    primary,
    secondary,
    scores: DIMENSION_ORDER.map((d) => {
      const found = scores.find((s) => s.dimension === d)!
      return found
    }),
    preferences: primary.preferences,
    strengths,
    blindSpots,
    matchTraits: primary.matchTraits,
    advices: primary.advices,
  }
}
