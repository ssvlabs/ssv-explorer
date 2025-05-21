import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/layouts/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"

import "@/styles/globals.css"
import "@fontsource/manrope/400.css"
import "@fontsource/manrope/500.css"
import "@fontsource/manrope/700.css"
import "@fontsource/manrope/800.css"
import "@fontsource/roboto-mono"

import { Suspense } from "react"
import type { Metadata, Viewport } from "next"
import { Slot } from "@radix-ui/react-slot"

import { Toaster } from "@/components/ui/toaster"

import { Providers } from "./_providers/providers"

export interface RootLayoutProps {
  children: React.ReactNode
  params: Promise<{
    page: string
    route: string
  }>
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "nextjs",
    "react",
    "react server components",
    "table",
    "react-table",
    "tanstack-table",
    "shadcn-table",
  ],
  authors: [
    {
      name: "sadmann7",
      url: "https://www.sadmn.com",
    },
  ],
  creator: "sadmann7",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@sadmann17",
  },
  icons: {
    icon: "/icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default async function RootLayout(props: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen bg-gray-200 font-sans antialiased")}>
        <style id="scroll-locked-style">
          {`
              body[data-scroll-locked] {
                margin-right: 0px !important;
              }
          `}
        </style>
        <Suspense>
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <Slot className="flex-1">{props.children}</Slot>
            </div>
            <TailwindIndicator />
          </Providers>
        </Suspense>
        <Toaster />
      </body>
    </html>
  )
}
