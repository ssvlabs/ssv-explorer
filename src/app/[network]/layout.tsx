import { redirect, RedirectType } from "next/navigation"

import { supportedChains } from "@/config/chains"

interface NetworkLayoutProps {
  children: React.ReactNode
  params: Promise<{
    network: string
  }>
}

export default async function NetworkLayout({
  children,
  params,
}: NetworkLayoutProps) {
  const { network } = await params
  const chain = supportedChains.find((chain) => chain.name === network)
  if (!chain) {
    return redirect(
      `/${supportedChains[0]?.name}/overview`,
      RedirectType.replace
    )
  }

  return <>{children}</>
}
