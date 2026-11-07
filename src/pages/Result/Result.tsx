import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import type { ReportResult } from '../../types'
import { DIMENSIONS } from '../../data/questions'
import { RadarChart } from '../../components/RadarChart'
import { BrandLockup, PillButton, Sparkle } from '../../components/ui'
import { ShareCard } from '../../components/ShareCard'
import { downloadImage } from '../../utils/download'

interface ResultProps {
  report: ReportResult
  onRestart: () => void
}

export function Result({ report, onRestart }: ResultProps) {
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const shareRef = useRef<HTMLDivElement>(null)

  const downloadCard = async () => {
    if (!shareRef.current) return
    setGenerating(true)
    setError(null)
    try {
      // 使用较高的 pixelRatio 保证图片清晰
      const dataUrl = await toPng(shareRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      })
      const ok = await downloadImage(
        dataUrl,
        `恋爱坐标-${report.primary.name}.png`,
      )
      if (!ok) {
        setError('图片生成成功，但下载失败。请尝试长按图片保存，或更换浏览器。')
      }
    } catch (e) {
      console.error(e)
      setError('图片生成失败，请稍后重试或更换浏览器。')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="min-h-screen pb-10">
      {/* 顶部结果摘要 */}
      <div className="relative bg-gradient-to-b from-blush to-cream px-6 pt-8 pb-6 overflow-hidden">
        <Sparkle className="absolute top-6 right-8 w-5 h-5 text-pink/50" aria-hidden="true" />
        <div className="flex items-center justify-between mb-4">
          <BrandLockup />
          <span className="text-xs text-rose/70">测试完成</span>
        </div>

        <div className="fade-in text-center">
          <div className="text-5xl mb-3">{report.primary.emoji}</div>
          <div className="text-sm text-plum/60 mb-1">你的婚恋定位是</div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: report.primary.color }}
          >
            {report.primary.name}
          </h1>
          <p className="text-base text-body/80 mb-2">{report.primary.tagline}</p>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs text-plum shadow-card">
            次定位 · {report.secondary.emoji} {report.secondary.name}
          </div>
        </div>
      </div>

      <main className="max-w-lg mx-auto w-full px-5 pt-6 flex flex-col gap-4">
        {/* 定位介绍 */}
        <section className="bg-white rounded-3xl p-5 shadow-card">
          <h2 className="font-semibold text-plum mb-2">你的定位</h2>
          <p className="text-sm text-body/80 leading-relaxed">
            {report.primary.description}
          </p>
        </section>

        {/* 五维画像 */}
        <section className="bg-white rounded-3xl p-5 shadow-card">
          <h2 className="font-semibold text-plum mb-1">五维能力画像</h2>
          <div className="flex justify-center py-2">
            <RadarChart scores={report.scores} color={report.primary.color} />
          </div>
          <div className="flex flex-col gap-2 mt-1">
            {report.scores.map((s) => {
              const meta = DIMENSIONS.find((d) => d.id === s.dimension)!
              return (
                <div key={s.dimension} className="flex items-center gap-3">
                  <span className="text-xs text-plum w-16 shrink-0">
                    {meta.name}
                  </span>
                  <div className="flex-1 h-2.5 rounded-full bg-blush overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${s.value}%`,
                        backgroundColor: report.primary.color,
                      }}
                    />
                  </div>
                  <span className="text-xs text-plum/70 tabular-nums w-8 text-right">
                    {s.value}
                  </span>
                </div>
              )
            })}
          </div>
        </section>

        {/* 择偶偏好 */}
        <section className="bg-white rounded-3xl p-5 shadow-card">
          <h2 className="font-semibold text-plum mb-3">你的择偶偏好</h2>
          <ul className="flex flex-col gap-2">
            {report.preferences.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-body/80">
                <span className="text-rose mt-0.5">♡</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 个人优势 */}
        <section className="bg-white rounded-3xl p-5 shadow-card">
          <h2 className="font-semibold text-plum mb-3">你的个人优势</h2>
          <ul className="flex flex-col gap-2">
            {report.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-body/80">
                <span className="text-rose mt-0.5">✦</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 择偶盲区 */}
        <section className="bg-white rounded-3xl p-5 shadow-card">
          <h2 className="font-semibold text-plum mb-3">可能的择偶盲区</h2>
          <ul className="flex flex-col gap-2">
            {report.blindSpots.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-body/80">
                <span className="text-rose/70 mt-0.5">△</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 适配伴侣 */}
        <section className="bg-white rounded-3xl p-5 shadow-card">
          <h2 className="font-semibold text-plum mb-3">适配伴侣画像</h2>
          <ul className="flex flex-col gap-2">
            {report.matchTraits.map((m, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-body/80">
                <span className="text-rose mt-0.5">◎</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 婚恋建议 */}
        <section className="bg-white rounded-3xl p-5 shadow-card">
          <h2 className="font-semibold text-plum mb-3">给你的婚恋建议</h2>
          <ol className="flex flex-col gap-3">
            {report.advices.map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold shrink-0 mt-0.5"
                  style={{ backgroundColor: report.primary.color }}
                >
                  {i + 1}
                </span>
                <span className="text-sm text-body/80 leading-relaxed">{a}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* 提示 */}
        <p className="text-[11px] text-body/50 text-center leading-relaxed px-2">
          本测试仅供娱乐与自我探索，五种定位无高低之分。
        </p>

        {/* 操作按钮 */}
        <div className="flex flex-col gap-3 mt-2">
          <PillButton
            onClick={downloadCard}
            className="w-full py-4 text-lg"
            disabled={generating}
          >
            {generating ? '正在生成图片…' : '生成分享卡片 ♡'}
          </PillButton>
          {error && (
            <p className="text-xs text-rose text-center leading-relaxed">{error}</p>
          )}
          <PillButton
            onClick={onRestart}
            variant="ghost"
            className="w-full py-3"
          >
            重新测试
          </PillButton>
        </div>
      </main>

      {/* 分享卡片（隐藏，用于截图） */}
      <div className="fixed left-[-9999px] top-0" aria-hidden="true">
        <div ref={shareRef}>
          <ShareCard report={report} />
        </div>
      </div>
    </div>
  )
}
