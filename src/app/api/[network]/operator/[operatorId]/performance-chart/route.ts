import { getOperatorPerformanceChart } from "@/api/operator"

import { chainNames, type ChainName } from "@/config/chains"

export async function GET(
  _request: Request,
  ctx: RouteContext<"/api/[network]/operator/[operatorId]/performance-chart">
) {
  const { network, operatorId } = await ctx.params
  const searchParams = new URL(_request.url).searchParams
  const pointsParam = searchParams.get("points")
  const typeParam = (searchParams.get("type") || "daily") as "daily" | "hourly"
  const points = Number(pointsParam)

  if (!chainNames.includes(network)) {
    return Response.json(
      { message: "Unsupported network parameter" },
      { status: 400 }
    )
  }

  const id = Number(operatorId)
  if (!Number.isFinite(id)) {
    return Response.json(
      { message: "Invalid operator id parameter" },
      { status: 400 }
    )
  }

  try {
    const chart = await getOperatorPerformanceChart({
      network: network as ChainName,
      operatorId: id,
      points: pointsParam && Number.isFinite(points) ? points : undefined,
      type: typeParam,
    })
    return Response.json(chart)
  } catch (error) {
    console.error("Failed to fetch operator performance chart:", error)
    return Response.json(
      { message: "Unable to fetch operator performance chart" },
      { status: 500 }
    )
  }
}
