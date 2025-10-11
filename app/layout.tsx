import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import { QueryProvider } from "@/lib/providers/query-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Dex2C Web - APK to C++ Conversion Platform",
  description: "Enterprise-grade APK processing with advanced obfuscation and native code generation",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <QueryProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </QueryProvider>
      </body>
    </html>
  )
}
