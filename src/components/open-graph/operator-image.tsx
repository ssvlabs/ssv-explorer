/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og"

import { siteConfig } from "@/config/site"

async function loadGoogleFont(font: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource) {
    const response = await fetch(resource[1] as string)
    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }

  throw new Error("failed to load font data")
}

export const OperatorImage = async ({ params }: { params: { id: string } }) => {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          padding: "40px",
          gap: "40px",
          justifyContent: "center",
          fontFamily: '"Inter", "Arial", sans-serif',
        }}
      >
        <img
          src={siteConfig.url + "/images/ssvIcons/icon.svg"}
          alt="ssv logo"
          width={380}
          height={380}
          style={{
            position: "absolute",
            top: -100,
            right: -120,
            opacity: 0.2,
            objectFit: "contain",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img
            src={siteConfig.url + "/images/operator-avatar.svg"}
            width={92}
            height={92}
            style={{
              borderRadius: "16px",
            }}
            alt="Operator Avatar"
          />
          <div
            style={{ display: "flex", flexDirection: "column", fontSize: 32 }}
          >
            <span style={{ fontFamily: "Open Sans", fontWeight: "bold" }}>
              Operator #{params.id}
            </span>
            <span style={{ fontSize: 16 }}>Operator Description</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              minWidth: "120px",
            }}
          >
            <span style={{ fontSize: 14, color: "#666" }}>24H</span>
            <span style={{ fontSize: 32, fontWeight: 900, color: "#22c55e" }}>
              98%
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              minWidth: "120px",
            }}
          >
            <span style={{ fontSize: 14, color: "#666" }}>30D</span>
            <span style={{ fontSize: 32, fontWeight: 900, color: "#22c55e" }}>
              95%
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              minWidth: "120px",
            }}
          >
            <span style={{ fontSize: 14, color: "#666" }}>Fee</span>
            <span style={{ fontSize: 32, fontWeight: 900, color: "#000" }}>
              2.5 SSV
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200 / 2,
      height: Math.round(630 / 2),
      fonts: [
        {
          name: "Geist",
          data: await loadGoogleFont("Geist"),
          style: "normal",
        },
      ],
    }
  )
}
