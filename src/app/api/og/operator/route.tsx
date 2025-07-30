/* eslint-disable tailwindcss/enforces-shorthand */
/* eslint-disable @next/next/no-img-element */

import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

import { siteConfig } from "@/config/site"
import { numberFormatter, percentageFormatter } from "@/lib/utils/number"
import { ogSearchParserCache } from "@/app/api/og/operator/parser"

const ManropeMedium = await readFile(
  join(process.cwd(), "public/fonts/Manrope/Manrope-Medium.ttf")
)
const ManropeBold = await readFile(
  join(process.cwd(), "public/fonts/Manrope/Manrope-Bold.ttf")
)

const getColor = (performance: number) => {
  if (performance > 99) return "#06B64F"
  if (performance > 96) return "#7ED90B"
  if (performance > 90) return "#FD9D2F"
  if (performance > 0) return "#EC1C26"
  if (performance === 0) return "#97A5BA"
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const parsed = ogSearchParserCache.parse(Object.fromEntries(searchParams))

    return new ImageResponse(
      (
        <div tw="relative flex h-[630px] w-[1200px] flex-col justify-center gap-[40px] bg-white p-[60px] font-[Manrope]">
          <img
            src={siteConfig.url + "/images/ssvIcons/icon.svg"}
            alt="ssv logo"
            width={491}
            height={690}
            style={{
              position: "absolute",
              top: -30,
              left: 954,
              opacity: 0.2,
              objectFit: "contain",
            }}
          />

          <div tw="mb-[100px] flex w-full max-w-full items-center">
            <div tw="mr-6 flex h-[240px] max-h-[240px] w-[240px] max-w-[240px] items-center justify-center">
              <img
                width={240 - 36}
                height={240 - 36}
                src={
                  parsed.logo || siteConfig.url + "/images/operator-avatar.svg"
                }
                style={{
                  objectFit: "cover",
                  borderRadius: "16px",
                  overflow: "hidden",
                  backgroundColor: "#F4F7FA",
                }}
                alt="Operator Avatar"
              />
            </div>
            <div tw="flex flex-1 flex-col items-start justify-center">
              <div tw="mb-9 flex w-full items-center">
                <p
                  tw="m-0 mr-[24px] text-[60px] font-bold"
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {parsed.name}
                </p>
                <div tw="flex items-center">
                  {parsed.is_private && (
                    <img
                      tw="mr-3"
                      src={siteConfig.url + "/images/operator_type/private.png"}
                      alt="Operator Avatar"
                      width={62}
                      height={62}
                    />
                  )}
                  {parsed.is_verified && (
                    <img
                      src={
                        siteConfig.url + "/images/operator_type/verified.svg"
                      }
                      alt="Operator Avatar"
                      width={54}
                      height={54}
                    />
                  )}
                </div>
              </div>
              <div tw="flex w-fit items-center rounded-[18px] border-[3px] border-[#F4F7FA] px-6 py-[6px]">
                <span tw="mr-3 text-[36px] font-medium text-[#97A5BA]">
                  ID:
                </span>
                <span tw="mr-3 text-[42px] font-medium">{parsed.id}</span>
              </div>
            </div>
          </div>

          <div tw="flex items-center">
            <div tw="flex flex-col">
              <p tw="mb m-0 text-[48px] font-bold text-[#97A5BA]">
                Performance (1D | 1M)
              </p>
              <div tw="flex items-center" style={{ gap: "16px" }}>
                <p
                  tw={"m-0 text-[60px] font-bold"}
                  style={{
                    color: getColor(parsed["24h"] ?? 0),
                  }}
                >
                  {percentageFormatter.format(parsed["24h"] ?? 0)}
                </p>
                <div tw="text-[60px] text-gray-300">|</div>
                <p
                  tw={"m-0 text-[60px] font-bold"}
                  style={{
                    color: getColor(parsed["30d"] ?? 0),
                  }}
                >
                  {percentageFormatter.format(parsed["30d"] ?? 0)}
                </p>
              </div>
            </div>
            <div tw="mx-[48px] h-[90%] border-r-[3px] border-gray-300" />
            <div tw="flex flex-col">
              <p tw="mb m-0 text-[36px] text-[#97A5BA]">Validators</p>
              <p tw={"m-0 text-[60px] font-bold"}>
                {numberFormatter.format(parsed.validators_count ?? 0)}
              </p>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Manrope",
            data: ManropeMedium,
            style: "normal",
            weight: 500,
          },
          {
            name: "Manrope",
            data: ManropeBold,
            style: "normal",
            weight: 800,
          },
        ],
        // headers: {
        //   // Cache for 1 day (60 seconds) with stale-while-revalidate for 7 days
        //   "Cache-Control": "public, s-maxage=60, stale-while-revalidate=604800",
        //   // ETag for better cache validation
        //   ETag: `"og-operator-${id}-${network}"`,
        // },
      }
    )
  } catch (error) {
    return new Response("Failed to generate the image", { status: 500 })
  }
}
