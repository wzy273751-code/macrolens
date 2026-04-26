import IndicatorCard from "./components/IndicatorCard";
import { mockIndicators } from "./data/mockIndicators";

const dailyBrief =
  "今日国家统计局公布4月CPI同比上涨0.3%，连续第三个月温和回升。核心CPI同比0.7%，显示内需仍在缓慢修复。结合昨日公布的社融数据（新增信贷低于预期），市场对央行二季度降准的预期有所升温。今日10年期国债收益率下行2BP至2.28%。在外需节奏仍不稳定的背景下，市场短期更关注政策端对信用扩张与居民消费修复的持续支持力度，权益市场风格或继续在防御与高股息之间轮动。";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">
        <header className="flex items-start justify-between gap-4 border-b border-neutral-800 pb-5">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">MacroLens</h1>
            <p className="mt-1 text-sm text-neutral-400">宏观透镜</p>
          </div>
          <p className="text-xs text-neutral-500 md:text-sm">
            数据更新于 2026-04-26 09:00
          </p>
        </header>

        <section className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900 p-5 md:p-6">
          <span className="inline-flex rounded-full border border-sky-900 bg-sky-950/50 px-3 py-1 text-xs text-sky-300">
            今日宏观速递
          </span>
          <p className="mt-4 text-sm leading-7 text-neutral-300 md:text-base">
            {dailyBrief}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-medium text-white">核心指标</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
            {mockIndicators.map((indicator) => (
              <IndicatorCard key={indicator.id} indicator={indicator} />
            ))}
          </div>
        </section>

        <footer className="mt-10 border-t border-neutral-800 pt-5 text-xs text-neutral-500 md:flex md:items-center md:justify-between">
          <p>本平台数据来自公开经济数据源，仅供研究学习，不构成投资建议。</p>
          <a
            className="mt-3 inline-block text-neutral-400 hover:text-white md:mt-0"
            href="#"
          >
            GitHub 仓库
          </a>
        </footer>
      </div>
    </main>
  );
}
