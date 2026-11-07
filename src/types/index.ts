// 维度定义
export type DimensionId =
  | 'goal' // 婚恋目标
  | 'standard' // 择偶标准
  | 'self' // 自我认知
  | 'relate' // 关系相处
  | 'reality' // 现实适配

// 五种婚恋定位
export type ArchetypeId =
  | 'clearFilter' // 清醒筛选型
  | 'mutual' // 双向奔赴型
  | 'stable' // 稳定经营型
  | 'feeling' // 感觉优先型
  | 'selfLed' // 自我主导型

export interface DimensionMeta {
  id: DimensionId
  name: string
  short: string
  description: string
}

// 每个选项的评分：针对 5 个维度分别给出的分值（0-5 或负值用于反向计分）
export interface OptionScore {
  goal: number
  standard: number
  self: number
  relate: number
  reality: number
}

export interface QuestionOption {
  id: string
  text: string
  score: OptionScore
}

export interface Question {
  id: string
  dimension: DimensionId
  title: string
  options: QuestionOption[]
}

// 结果定位的静态文案
export interface Archetype {
  id: ArchetypeId
  name: string
  tagline: string // 一句话介绍
  description: string // 详细描述
  emoji: string
  color: string // 用于展示的主题色
  strengths: string[] // 主要优势
  preferences: string[] // 择偶偏好
  blindSpots: string[] // 潜在盲区
  matchTraits: string[] // 适配伴侣特征
  advices: string[] // 三条建议
}

export interface DimensionScore {
  dimension: DimensionId
  value: number // 0-100
}

export interface ReportResult {
  primary: Archetype
  secondary: Archetype
  scores: DimensionScore[]
  preferences: string[]
  strengths: string[]
  blindSpots: string[]
  matchTraits: string[]
  advices: string[]
}

export interface AnswerMap {
  [questionId: string]: string // optionId
}
