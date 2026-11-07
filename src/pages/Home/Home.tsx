import { BrandLockup, PillButton, Sparkle, Flower } from '../../components/ui'

interface HomeProps {
  onStart: () => void
  onAbout: () => void
  hasProgress: boolean
  onResume: () => void
}

export function Home({ onStart, onAbout, hasProgress, onResume }: HomeProps) {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* 背景装饰 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Sparkle className="absolute top-16 left-8 w-5 h-5 text-pink/50" />
        <Sparkle className="absolute top-32 right-10 w-3 h-3 text-rose/40" />
        <Flower className="absolute bottom-40 left-10 w-8 h-8 text-pink/40" />
        <Sparkle className="absolute bottom-56 right-8 w-4 h-4 text-pink/40" />
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blush/70 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-pink/20 blur-3xl" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-5 pt-6">
        <BrandLockup />
        <button
          onClick={onAbout}
          className="text-sm text-plum/70 hover:text-plum transition-colors"
        >
          关于测试
        </button>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10 text-center">
        <div className="fade-in max-w-sm w-full">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-pink/30 px-4 py-1.5 text-xs text-plum mb-6 shadow-card">
            <span className="text-rose">♡</span>
            你的专属婚恋定位测试
          </div>

          <h1 className="text-3xl font-bold text-plum leading-snug mb-3">
            你的婚恋市场定位
            <br />
            是什么？
          </h1>

          <p className="text-body/80 text-base leading-relaxed mb-8">
            在寻找合适的另一半之前，
            <br />
            不如先认识一下自己的婚恋坐标。
          </p>

          <p className="text-sm text-body/70 leading-relaxed mb-8">
            通过 20 道趣味问题，探索你的择偶偏好、
            <br />
            关系期待、个人优势与适配方向。
          </p>

          <PillButton
            onClick={onStart}
            className="w-full py-4 text-lg mb-3"
          >
            开始测试 ♡
          </PillButton>

          {hasProgress && (
            <button
              onClick={onResume}
              className="text-sm text-rose/80 hover:text-rose underline underline-offset-4 transition-colors"
            >
              继续上次未完成的测试
            </button>
          )}
        </div>
      </main>

      <footer className="relative z-10 text-center px-6 pb-8">
        <p className="text-[11px] text-body/50 leading-relaxed">
          本测试仅供娱乐与自我探索，非心理诊断或婚恋价值评估。
          <br />
          我们不会收集你的姓名、手机号等个人身份信息。
        </p>
      </footer>
    </div>
  )
}
