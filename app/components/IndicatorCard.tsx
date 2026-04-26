import type { Indicator } from "../data/mockIndicators";

type IndicatorCardProps = {
  indicator: Indicator;
};

export default function IndicatorCard({ indicator }: IndicatorCardProps) {
  const isUp = indicator.direction === "up";
  const directionArrow = isUp ? "▲" : "▼";
  const directionColor = isUp ? "text-green-400" : "text-red-400";

  return (
    <article className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 md:p-5">
      <h3 className="text-sm text-neutral-400">{indicator.name}</h3>
      <p className="mt-3 text-3xl font-semibold text-white">{indicator.value}</p>
      <p className={`mt-2 text-sm font-medium ${directionColor}`}>
        同比 {directionArrow} {indicator.yoyChange}
      </p>
      <p className="mt-3 text-sm text-neutral-500">{indicator.description}</p>
      <p className="mt-4 text-xs text-neutral-500">数据日期：{indicator.date}</p>
    </article>
  );
}
