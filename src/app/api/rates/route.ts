import { getSSVRates } from "@/api/ssv"

export async function GET() {
  const data = await getSSVRates()
  return Response.json(data)
}
