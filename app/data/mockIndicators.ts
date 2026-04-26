export type IndicatorDirection = "up" | "down";

export type Indicator = {
  id: string;
  name: string;
  value: string;
  yoyChange: string;
  direction: IndicatorDirection;
  description: string;
  date: string;
};

export const mockIndicators: Indicator[] = [
  {
    id: "cpi",
    name: "CPI 居民消费价格指数",
    value: "0.3%",
    yoyChange: "+0.1pp",
    direction: "up",
    description: "过去10年第8百分位",
    date: "2026-04",
  },
  {
    id: "pmi",
    name: "PMI 制造业采购经理人指数",
    value: "49.5",
    yoyChange: "-0.3",
    direction: "down",
    description: "重回荣枯线下方",
    date: "2026-04",
  },
  {
    id: "tsf",
    name: "社融存量同比",
    value: "8.7%",
    yoyChange: "-0.2pp",
    direction: "down",
    description: "新增融资低于预期",
    date: "2026-03",
  },
  {
    id: "m2",
    name: "M2 广义货币供应量",
    value: "8.4%",
    yoyChange: "+0.1pp",
    direction: "up",
    description: "流动性保持合理充裕",
    date: "2026-03",
  },
  {
    id: "gdp",
    name: "GDP 同比增速",
    value: "5.0%",
    yoyChange: "+0.1pp",
    direction: "up",
    description: "经济企稳回升态势",
    date: "2026Q1",
  },
  {
    id: "unemployment",
    name: "城镇调查失业率",
    value: "5.2%",
    yoyChange: "-0.1pp",
    direction: "down",
    description: "就业市场基本稳定",
    date: "2026-03",
  },
];
