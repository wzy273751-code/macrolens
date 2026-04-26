"use client";

import { useEffect, useMemo, useState } from "react";
import type { Indicator } from "../data/mockIndicators";

type IndicatorDetailModalProps = {
  indicator: Indicator | null;
  isOpen: boolean;
  onClose: () => void;
};

function buildPolylinePoints(values: number[], width: number, height: number) {
  if (values.length === 0) return "";
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  return values
    .map((value, index) => {
      const x = (index / (values.length - 1 || 1)) * width;
      const y = ((max - value) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");
}

export default function IndicatorDetailModal({
  indicator,
  isOpen,
  onClose,
}: IndicatorDetailModalProps) {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      const frame = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    setIsVisible(false);
    const timeout = setTimeout(() => setIsRendered(false), 220);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscClose);
    return () => window.removeEventListener("keydown", handleEscClose);
  }, [isOpen, onClose]);

  const chartPoints = useMemo(() => {
    if (!indicator) return "";
    return buildPolylinePoints(indicator.historicalData, 100, 44);
  }, [indicator]);

  const isTrendUp = useMemo(() => {
    if (!indicator || indicator.historicalData.length < 2) return true;
    const first = indicator.historicalData[0];
    const last = indicator.historicalData[indicator.historicalData.length - 1];
    return last >= first;
  }, [indicator]);

  if (!isRendered || !indicator) return null;

  return (
    <div
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`w-full max-w-3xl rounded-2xl border border-neutral-800 bg-neutral-900 p-5 text-white shadow-2xl transition-all duration-200 md:p-6 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold">{indicator.name}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-neutral-700 px-2 py-1 text-neutral-400 transition-colors hover:border-neutral-500 hover:text-white"
            aria-label="关闭详情面板"
          >
            ×
          </button>
        </div>

        <section className="mt-5 rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
          <p className="text-sm text-neutral-400">当前数据摘要</p>
          <div className="mt-3 flex flex-wrap items-end gap-x-6 gap-y-2">
            <p className="text-3xl font-semibold">{indicator.value}</p>
            <p
              className={`text-sm font-medium ${
                indicator.direction === "up" ? "text-green-400" : "text-red-400"
              }`}
            >
              同比 {indicator.direction === "up" ? "▲" : "▼"} {indicator.yoyChange}
            </p>
            <p className="text-sm text-neutral-500">数据日期：{indicator.date}</p>
          </div>
        </section>

        <section className="mt-5">
          <h4 className="text-sm font-medium text-neutral-300">AI 经济学家解读</h4>
          <p className="mt-2 text-sm leading-7 text-neutral-300">{indicator.aiAnalysis}</p>
        </section>

        <section className="mt-6">
          <h4 className="text-sm font-medium text-neutral-300">历史走势（过去12个月）</h4>
          <div className="mt-3 rounded-xl border border-neutral-800 bg-neutral-950/60 p-3">
            <svg viewBox="0 0 100 44" className="h-40 w-full">
              <line x1="0" y1="44" x2="100" y2="44" stroke="#404040" strokeWidth="0.5" />
              <line x1="0" y1="22" x2="100" y2="22" stroke="#2f2f2f" strokeWidth="0.5" />
              <line x1="0" y1="0" x2="100" y2="0" stroke="#2a2a2a" strokeWidth="0.5" />
              <polyline
                points={chartPoints}
                fill="none"
                stroke={isTrendUp ? "#4ade80" : "#f87171"}
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <p className="mt-1 text-xs text-neutral-500">← 12个月前 · 最近 →</p>
          </div>
        </section>

        <section className="mt-6">
          <h4 className="text-sm font-medium text-neutral-300">对三类人的含义</h4>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-3">
              <p className="text-xs text-neutral-500">打工人</p>
              <p className="mt-1 text-sm text-neutral-300">{indicator.impacts.workers}</p>
            </div>
            <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-3">
              <p className="text-xs text-neutral-500">投资者</p>
              <p className="mt-1 text-sm text-neutral-300">{indicator.impacts.investors}</p>
            </div>
            <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-3">
              <p className="text-xs text-neutral-500">企业主</p>
              <p className="mt-1 text-sm text-neutral-300">{indicator.impacts.businesses}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
