"use server"

import { redirect } from "next/navigation"

import { type ChainName } from "@/config/chains"
import { extractNetworkParam } from "@/lib/server-utils/network-param"

type NotFoundProps = {
  params: Promise<{
    network: ChainName
  }>
}

export default async function NotFound({ params }: NotFoundProps) {
  const network = extractNetworkParam(await params)
  return redirect(`/${network}/overview`)
}
