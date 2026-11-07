import type { ReportResult } from '../types'
import { RadarChart } from './RadarChart'

/**
 * 分享卡片（独立设计，竖版 540×720 逻辑尺寸，2x 导出后约 1080×1440）
 * 通过 html-to-image 截图生成 PNG。
 */
interface ShareCardProps {
  report: ReportResult
}

export function ShareCard({ report }: ShareCardProps) {
  const { primary, secondary, scores } = report

  return (
    <div
      style={{
        width: 540,
        height: 720,
        background: 'linear-gradient(180deg, #FFF4F8 0%, #FFE2ED 100%)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily:
          "'PingFang SC','Hiragino Sans GB','Microsoft YaHei','Noto Sans SC',sans-serif",
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* 顶部装饰 */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 40,
          width: 90,
          height: 90,
          borderRadius: '50%',
          background: 'rgba(246,169,200,0.18)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 70,
          right: 50,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'rgba(231,127,169,0.14)',
        }}
      />

      {/* 品牌 */}
      <div
        style={{
          marginTop: 44,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <svg width="34" height="34" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="30" fill="#FFE2ED" />
          <path
            d="M32 48 C19 39.5 14 33 14 26 C14 20.5 18 17 22.5 17 C26 17 28.5 19 32 23 C35.5 19 38 17 41.5 17 C46 17 50 20.5 50 26 C50 33 45 39.5 32 48 Z"
            fill="#F6A9C8"
          />
        </svg>
        <span style={{ fontSize: 20, fontWeight: 700, color: '#8D536D' }}>
          恋爱坐标
        </span>
      </div>

      {/* 主定位 */}
      <div style={{ marginTop: 26, fontSize: 34, lineHeight: 1 }}>{primary.emoji}</div>
      <div style={{ marginTop: 12, fontSize: 15, color: '#8D536D', opacity: 0.7 }}>
        我的婚恋定位是
      </div>
      <div
        style={{
          marginTop: 6,
          fontSize: 34,
          fontWeight: 800,
          color: primary.color,
          letterSpacing: 2,
        }}
      >
        {primary.name}
      </div>
      <div
        style={{
          marginTop: 12,
          fontSize: 16,
          color: '#594650',
          opacity: 0.85,
        }}
      >
        {primary.tagline}
      </div>

      {/* 次定位 */}
      <div
        style={{
          marginTop: 18,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(255,255,255,0.75)',
          borderRadius: 999,
          padding: '8px 18px',
          fontSize: 13,
          color: '#8D536D',
        }}
      >
        次定位 · {secondary.emoji} {secondary.name}
      </div>

      {/* 五维图 */}
      <div style={{ marginTop: 24 }}>
        <RadarChart scores={scores} size={240} color={primary.color} />
      </div>

      {/* 引导语 */}
      <div
        style={{
          position: 'absolute',
          bottom: 36,
          textAlign: 'center',
          fontSize: 14,
          color: '#8D536D',
          opacity: 0.75,
          lineHeight: 1.6,
        }}
      >
        你的婚恋坐标，又会落在哪里？
        <br />
        来测一测你的婚恋市场定位 →
      </div>
    </div>
  )
}
