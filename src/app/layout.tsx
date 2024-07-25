import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Root from "@/components/Root";
import { ContextWrap } from "@/context/myContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpyFall by Itay",
  description: "Game built by Itay Talal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Root/>
        <ContextWrap>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          {children}
        </main>
        </ContextWrap>
      </body>
    </html>
  );
}
