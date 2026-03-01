import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RiskLens | Intelligent Fraud Analytics",
  description:
    "Advanced ML-powered insurance fraud detection platform. Precision risk scoring with lens-level clarity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#0a0a0f] text-gray-100`}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
