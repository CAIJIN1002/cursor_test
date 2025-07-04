import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "匯率計算機 | Currency Calculator",
  description: "快速、準確的多國貨幣匯率換算工具，支援美元、歐元、日圓、新台幣等主要貨幣的即時匯率轉換",
  keywords: "匯率計算機, 貨幣換算, 匯率轉換, currency calculator, exchange rate",
  authors: [{ name: "Currency Calculator App" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
