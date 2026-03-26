import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "波動シグナル研究所 | リスクリワード最大化トレード術",
    template: "%s | 波動シグナル研究所",
  },
  description:
    "SMC（スマートマネーコンセプト）を基礎から実践まで学べる無料講座。機関投資家の動きを読み、リスクリワードを最大化するトレード術を全14章で完全解説。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans">
        {children}
      </body>
    </html>
  );
}
