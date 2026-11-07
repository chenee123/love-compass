import type { DimensionScore } from '../types'
import { DIMENSIONS } from '../data/questions'

/**
 * 五维雷达图（原生 SVG 实现，避免额外依赖）
 * 同时用于结果页展示与分享卡片生成，保持视觉一致。
 */
export function RadarChart({
  scores,
  size = 260,
  color = '#E77FA9',
}: {
  scores: DimensionScore[]
  size?: number
  color?: string
}) {
  const cx = size / 2
  const cy = size / 2
  const radius = size / 2 - 42 // 留出标签空间
  const levels = 5 // 网格圈数

  const angleFor = (index: number, total: number) =>
    -Math.PI / 2 + (index * 2 * Math.PI) / total

  const pointAt = (angle: number, r: number) => ({
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  })

  const scoreMap = new Map(scores.map((s) => [s.dimension, s.value]))
  const total = DIMENSIONS.length

  // 生成多边形点
  const polygonPoints = DIMENSIONS.map((d, i) => {
    const v = scoreMap.get(d.id) ?? 0
    const r = (v / 100) * radius
    const p = pointAt(angleFor(i, total), r)
    return `${p.x},${p.y}`
  }).join(' ')

  // 网格
  const gridPolygons = Array.from({ length: levels }, (_, lvl) => {
    const r = (radius / levels) * (lvl + 1)
    return DIMENSIONS.map((_, i) => {
      const p = pointAt(angleFor(i, total), r)
      return `${p.x},${p.y}`
    }).join(' ')
  })

  // 轴线
  const axes = DIMENSIONS.map((_, i) => {
    const p = pointAt(angleFor(i, total), radius)
    return { x1: cx, y1: cy, x2: p.x, y2: p.y }
  })

  // 标签位置
  const labels = DIMENSIONS.map((d, i) => {
    const labelR = radius + 20
    return {
      ...pointAt(angleFor(i, total), labelR),
      name: d.short,
    }
  })

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="五维能力画像雷达图"
    >
      {/* 网格 */}
      {gridPolygons.map((points, i) => (
        <polygon
          key={i}
          points={points}
          fill="none"
          stroke="#FFE2ED"
          strokeWidth={1}
        />
      ))}
      {/* 轴线 */}
      {axes.map((a, i) => (
        <line
          key={i}
          x1={a.x1}
          y1={a.y1}
          x2={a.x2}
          y2={a.y2}
          stroke="#FFE2ED"
          strokeWidth={1}
        />
      ))}
      {/* 数据多边形 */}
      <polygon
        points={polygonPoints}
        fill={color}
        fillOpacity={0.25}
        stroke={color}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      {/* 数据顶点 */}
      {DIMENSIONS.map((d, i) => {
        const v = scoreMap.get(d.id) ?? 0
        const p = pointAt(angleFor(i, total), (v / 100) * radius)
        return <circle key={d.id} cx={p.x} cy={p.y} r={3.5} fill={color} />
      })}
      {/* 标签 */}
      {labels.map((l, i) => (
        <text
          key={i}
          x={l.x}
          y={l.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#8D536D"
          fontSize={13}
          fontWeight={600}
        >
          {l.name}
        </text>
      ))}
    </svg>
  )
}
