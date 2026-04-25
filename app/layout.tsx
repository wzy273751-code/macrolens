import type { Metadata } from "next";
import { Inter, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MacroLens · 宏观透镜",
  description: "AI 驱动的宏观经济数据可视化平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body
        className={`${inter.className} min-h-full flex flex-col`}
        style={{
          fontFamily: `${inter.style.fontFamily}, ${notoSansSC.style.fontFamily}, "PingFang SC", "Microsoft YaHei", sans-serif`,
        }}
      >
        {children}
      </body>
    </html>
  );
}
