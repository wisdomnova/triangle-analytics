import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  // Fetch Geist font for crisp, premium typography
  const [geistSemiBoldData, geistRegularData] = await Promise.all([
    fetch('https://cdn.jsdelivr.net/npm/geist@1.3.0/dist/fonts/geist-sans/Geist-SemiBold.ttf')
      .then((res) => res.arrayBuffer())
      .catch(() => null),
    fetch('https://cdn.jsdelivr.net/npm/geist@1.3.0/dist/fonts/geist-sans/Geist-Regular.ttf')
      .then((res) => res.arrayBuffer())
      .catch(() => null),
  ])

  const fonts: any[] = []
  if (geistSemiBoldData) {
    fonts.push({
      name: 'Geist',
      data: geistSemiBoldData,
      weight: 600,
      style: 'normal',
    })
  }
  if (geistRegularData) {
    fonts.push({
      name: 'Geist',
      data: geistRegularData,
      weight: 400,
      style: 'normal',
    })
  }

  // Load logo as base64
  let logoBase64 = ''
  try {
    const logoPath = path.join(process.cwd(), 'public/images/logo-solid-plain.png')
    if (fs.existsSync(logoPath)) {
      const buffer = fs.readFileSync(logoPath)
      logoBase64 = `data:image/png;base64,${buffer.toString('base64')}`
    }
  } catch (_) {
    // Fallback if read fails
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#FAF8F5',
          fontFamily: 'Geist, system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* BOTTOM RIGHT CORNER: Plain, Simple & Precise Brand Mark & Typography with Analytics underneath */}
        <div
          style={{
            position: 'absolute',
            bottom: '72px',
            right: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {/* Brand Logo */}
          {logoBase64 ? (
            <img
              src={logoBase64}
              alt="Triangle Analytics"
              width="60"
              height="60"
              style={{
                width: '60px',
                height: '60px',
                objectFit: 'contain',
              }}
            />
          ) : (
            <div
              style={{
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="56" height="56" viewBox="0 0 100 100" fill="none">
                <polygon points="50,15 90,85 10,85" fill="#1E1E1C" />
              </svg>
            </div>
          )}

          {/* Typography: "The Triangle" with "Analytics" underneath */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '2px',
            }}
          >
            <span
              style={{
                fontSize: '46px',
                fontWeight: 600,
                letterSpacing: '-0.035em',
                color: '#1E1E1C',
                lineHeight: 1,
              }}
            >
              The Triangle
            </span>
            <span
              style={{
                fontSize: '20px',
                fontWeight: 400,
                letterSpacing: '0.01em',
                color: '#7A7975',
                lineHeight: 1.1,
              }}
            >
              Analytics
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    }
  )
}
