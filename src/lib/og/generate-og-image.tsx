import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getSiteContent } from "@/lib/content";

export const OG_SIZE = {
  width: 1200,
  height: 630,
} as const;

const COLORS = {
  background: "#fafafa",
  foreground: "#0a0a0a",
  muted: "#737373",
  border: "rgba(10, 10, 10, 0.12)",
  surface: "#ffffff",
} as const;

function bufferToDataUrl(buffer: Buffer, mimeType: string): string {
  return `data:${mimeType};base64,${buffer.toString("base64")}`;
}

export async function generateOgImage(): Promise<ImageResponse> {
  const site = getSiteContent();
  const domain = new URL(site.meta.url).hostname;

  const [headshotBuffer, lockupBuffer] = await Promise.all([
    readFile(join(process.cwd(), "public/david_headshot.jpg")),
    readFile(join(process.cwd(), "public/brand/cursor/og-lockup.png")),
  ]);

  const headshotSrc = bufferToDataUrl(headshotBuffer, "image/jpeg");
  const lockupSrc = bufferToDataUrl(lockupBuffer, "image/png");
  const fontFamily = "system-ui, -apple-system, sans-serif";
  const fontMono = "ui-monospace, SFMono-Regular, monospace";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: COLORS.background,
          color: COLORS.foreground,
          fontFamily,
          padding: "48px 56px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lockupSrc} alt="" width={220} height={52} />
          <div
            style={{
              fontFamily: fontMono,
              fontSize: 18,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: COLORS.muted,
            }}
          >
            {domain}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
            width: "100%",
            marginTop: 36,
            gap: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              maxWidth: 680,
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontSize: 52,
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              {site.name}
            </div>
            <div
              style={{
                marginTop: 16,
                fontFamily: fontMono,
                fontSize: 20,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: COLORS.muted,
              }}
            >
              {site.title}
            </div>
            <div
              style={{
                marginTop: 28,
                fontSize: 44,
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                color: COLORS.foreground,
              }}
            >
              {site.headline}
            </div>
            <div
              style={{
                marginTop: 36,
                display: "flex",
                alignItems: "center",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 999,
                backgroundColor: COLORS.surface,
                padding: "10px 18px",
                alignSelf: "flex-start",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: COLORS.foreground,
                  marginRight: 10,
                }}
              />
              <div
                style={{
                  fontFamily: fontMono,
                  fontSize: 16,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: COLORS.muted,
                }}
              >
                Available · US Remote · Idaho
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexShrink: 0,
              width: 320,
              height: 400,
              borderRadius: 16,
              border: `1px solid ${COLORS.border}`,
              backgroundColor: COLORS.surface,
              overflow: "hidden",
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.06)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={headshotSrc}
              alt=""
              width={320}
              height={400}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
