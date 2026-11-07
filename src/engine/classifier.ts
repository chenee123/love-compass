import type { ArchetypeId, DimensionScore } from '../types'

/**
 * 分类器：把五维得分映射到五种婚恋定位，区分主定位与次定位。
 *
 * 映射规则（每个定位由若干维度的"特征信号"共同决定，而非单一维度最高分）：
 *   - 清醒筛选型 clearFilter：择偶标准(standard) 与 现实适配(reality) 双高
 *   - 双向奔赴型 mutual      ：关系相处(relate) 高，且目标/标准不过度理性
 *   - 稳定经营型 stable      ：婚恋目标(goal) 与 现实适配(reality) 双高
 *   - 感觉优先型 feeling     ：关系相处(relate) 高，且现实适配(reality) 低
 *   - 自我主导型 selfLed     ：自我认知(self) 高
 *
 * 通过为每个定位计算一个 0~1 的"匹配强度"得分，取最高者为"主定位"、
 * 次高者为"次定位"。这样避免了"只看单一维度最高分"导致的机械分类，
 * 也让所有答题组合都能得到合理的结果。
 */

interface ArchetypeScore {
  id: ArchetypeId
  score: number
}

function pick(dimension: DimensionScore[], key: string): number {
  const item = dimension.find((d) => d.dimension === key)
  return item ? item.value : 0
}

// 归一化辅助：把 0~100 转成 0~1
function norm(v: number): number {
  return v / 100
}

/**
 * 计算五种定位的匹配强度（0~1）。
 */
export function computeArchetypeScores(
  scores: DimensionScore[],
): ArchetypeScore[] {
  const goal = pick(scores, 'goal')
  const standard = pick(scores, 'standard')
  const self = pick(scores, 'self')
  const relate = pick(scores, 'relate')
  const reality = pick(scores, 'reality')

  const list: ArchetypeScore[] = [
    {
      id: 'clearFilter',
      // 择偶标准 + 现实适配双高，辅以目标清晰
      score: norm(standard) * 0.4 + norm(reality) * 0.35 + norm(goal) * 0.25,
    },
    {
      id: 'mutual',
      // 关系相处高，且不过度偏理性筛选（standard/reality 权重较低）
      score:
        norm(relate) * 0.5 +
        norm(goal) * 0.2 +
        (1 - norm(standard)) * 0.15 +
        norm(self) * 0.15,
    },
    {
      id: 'stable',
      // 婚恋目标 + 现实适配双高
      score: norm(goal) * 0.4 + norm(reality) * 0.4 + norm(standard) * 0.2,
    },
    {
      id: 'feeling',
      // 关系相处高，且现实适配低（更偏感觉）
      score:
        norm(relate) * 0.5 +
        (1 - norm(reality)) * 0.3 +
        norm(self) * 0.2,
    },
    {
      id: 'selfLed',
      // 自我认知高，辅以关系相处不过度黏着
      score:
        norm(self) * 0.5 +
        (1 - norm(relate)) * 0.25 +
        norm(reality) * 0.25,
    },
  ]

  return list
}

export interface ClassifiedResult {
  primary: ArchetypeId
  secondary: ArchetypeId
}

/**
 * 根据五维得分，返回主定位与次定位。
 * 处理并列：若最高分并列，优先按固定顺序（clearFilter → mutual → stable → feeling → selfLed）
 * 保证结果确定性；若次定位与主定位同分并列，则跳过主定位取下一个。
 */
export function classify(scores: DimensionScore[]): ClassifiedResult {
  const list = computeArchetypeScores(scores)

  // 按分数降序排序；分数相同时按固定顺序保证确定性
  const order: ArchetypeId[] = [
    'clearFilter',
    'mutual',
    'stable',
    'feeling',
    'selfLed',
  ]
  const sorted = [...list].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return order.indexOf(a.id) - order.indexOf(b.id)
  })

  const primary = sorted[0].id
  const secondary = sorted.find((s) => s.id !== primary)?.id ?? sorted[1].id

  return { primary, secondary }
}
