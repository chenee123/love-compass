import { BrandLockup, PillButton } from '../../components/ui'

interface AboutProps {
  onBack: () => void
  onClearData: () => void
}

export function About({ onBack, onClearData }: AboutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-5 pt-6">
        <BrandLockup />
        <button
          onClick={onBack}
          className="text-sm text-plum/70 hover:text-plum transition-colors"
        >
          ← 返回
        </button>
      </header>

      <main className="flex-1 px-6 py-8 max-w-lg mx-auto w-full">
        <h1 className="text-2xl font-bold text-plum mb-6">关于「恋爱坐标」</h1>

        <section className="bg-white rounded-3xl p-5 shadow-card mb-4">
          <h2 className="font-semibold text-plum mb-2">这是什么测试？</h2>
          <p className="text-sm text-body/80 leading-relaxed">
            「恋爱坐标」是一款趣味婚恋定位测试。通过 20 道生活场景题，帮你梳理自己的婚恋定位、择偶标准、个人优势和适配对象。
            <br />
            <br />
            它不是为了给谁打分排名，也不是判断谁的婚恋条件更好，而是希望你能得到一份有趣、具体、值得收藏和分享的个人报告。
          </p>
        </section>

        <section className="bg-white rounded-3xl p-5 shadow-card mb-4">
          <h2 className="font-semibold text-plum mb-2">测试如何计分？</h2>
          <p className="text-sm text-body/80 leading-relaxed">
            测试共 5 个维度：婚恋目标、择偶标准、自我认知、关系相处、现实适配。每个维度 4 道题，最终归一化为 0~100 分，并据此匹配出你的主定位与次定位。
          </p>
        </section>

        <section className="bg-white rounded-3xl p-5 shadow-card mb-4">
          <h2 className="font-semibold text-plum mb-2">隐私说明</h2>
          <p className="text-sm text-body/80 leading-relaxed">
            本测试不需要注册，也不会收集你的姓名、手机号、身份证号等个人身份信息。
            <br />
            <br />
            你的答题进度仅临时保存在你自己的浏览器本地（localStorage），不会上传到服务器。你可以随时清除这些本地数据。
          </p>
        </section>

        <section className="bg-white rounded-3xl p-5 shadow-card mb-8">
          <h2 className="font-semibold text-plum mb-2">重要提示</h2>
          <p className="text-sm text-body/80 leading-relaxed">
            本测试仅供娱乐和自我探索用途，不是心理诊断、婚恋价值评估或科学预测。五种定位不存在高低之分，也不代表婚恋价值高低。
          </p>
        </section>

        <PillButton
          onClick={onClearData}
          variant="ghost"
          className="w-full py-3 text-sm mb-3"
        >
          清除我的本地答题数据
        </PillButton>

        <PillButton onClick={onBack} className="w-full py-3">
          返回首页
        </PillButton>
      </main>
    </div>
  )
}
