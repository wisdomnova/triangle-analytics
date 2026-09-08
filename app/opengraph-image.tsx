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
  const [geistBoldData, geistMediumData] = await Promise.all([
    fetch('https://cdn.jsdelivr.net/npm/geist@1.3.0/dist/fonts/geist-sans/Geist-Bold.ttf')
      .then((res) => res.arrayBuffer())
      .catch(() => null),
    fetch('https://cdn.jsdelivr.net/npm/geist@1.3.0/dist/fonts/geist-sans/Geist-Medium.ttf')
      .then((res) => res.arrayBuffer())
      .catch(() => null),
  ])

  const fonts: any[] = []
  if (geistBoldData) {
    fonts.push({
      name: 'Geist',
      data: geistBoldData,
      weight: 700,
      style: 'normal',
    })
  }
  if (geistMediumData) {
    fonts.push({
      name: 'Geist',
      data: geistMediumData,
      weight: 500,
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
          backgroundColor: '#F8D7E0',
          fontFamily: 'Geist, system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Non-uniform Off-Pink Smoothie Organic Gradient & Pixie Dust Background */}
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <defs>
            {/* Base multi-point creamy smoothie radial gradients */}
            <radialGradient id="smoothieBase" cx="45%" cy="40%" r="75%">
              <stop offset="0%" stopColor="#FDEFF4" />
              <stop offset="35%" stopColor="#F9D7E2" />
              <stop offset="70%" stopColor="#F1BFCE" />
              <stop offset="100%" stopColor="#E69FB2" />
            </radialGradient>

            {/* Deep Strawberry Swirl Top-Left */}
            <radialGradient id="strawberrySwirl" cx="18%" cy="22%" r="55%">
              <stop offset="0%" stopColor="#E992AA" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#F4B7C7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#F9D8E3" stopOpacity="0" />
            </radialGradient>

            {/* Frothy Milk Cream Highlight Top-Right */}
            <radialGradient id="frothGlow" cx="72%" cy="25%" r="48%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#FFF2F6" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#F9D5E0" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F6C8D7" stopOpacity="0" />
            </radialGradient>

            {/* Rich Raspberry Cream Swirl Bottom-Left */}
            <radialGradient id="berrySwirl" cx="30%" cy="85%" r="60%">
              <stop offset="0%" stopColor="#E286A1" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#EEA8BC" stopOpacity="0.5" />
              <stop offset="85%" stopColor="#F8D6E1" stopOpacity="0" />
            </radialGradient>

            {/* Soft Peach-Pink Cream Swirl Center-Right */}
            <radialGradient id="peachSwirl" cx="82%" cy="75%" r="50%">
              <stop offset="0%" stopColor="#FFE8EE" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#F5CAD7" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#F1BACB" stopOpacity="0" />
            </radialGradient>

            {/* Glowing Pixie Sparkle Star Radial Glow */}
            <radialGradient id="pixieAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#FFF5F8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Gradient Canvas */}
          <rect width="1200" height="630" fill="#F8D7E0" />
          <rect width="1200" height="630" fill="url(#smoothieBase)" />
          <rect width="1200" height="630" fill="url(#strawberrySwirl)" />
          <rect width="1200" height="630" fill="url(#frothGlow)" />
          <rect width="1200" height="630" fill="url(#berrySwirl)" />
          <rect width="1200" height="630" fill="url(#peachSwirl)" />

          {/* Organic Creamy Swirl Texture Waves */}
          <path
            d="M-80,180 C220,90 480,260 760,140 C1020,30 1180,120 1300,80 L1300,-50 L-80,-50 Z"
            fill="rgba(255, 255, 255, 0.28)"
          />
          <path
            d="M-50,380 C180,480 520,310 820,440 C1040,530 1190,460 1300,490 L1300,700 L-50,700 Z"
            fill="rgba(235, 148, 172, 0.22)"
          />
          <path
            d="M150,-50 C380,140 680,80 940,220 C1120,320 1220,290 1320,360"
            fill="none"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="48"
            strokeLinecap="round"
          />
          <path
            d="M-80,420 C240,320 540,510 860,390 C1060,310 1180,360 1320,320"
            fill="none"
            stroke="rgba(255, 245, 248, 0.25)"
            strokeWidth="64"
            strokeLinecap="round"
          />

          {/* Non-Uniform Pixie Dust & Diamond Sparkle Stars */}
          {/* Sparkle Star 1 (Top Left) */}
          <circle cx="160" cy="110" r="14" fill="url(#pixieAura)" />
          <g transform="translate(160, 110)" opacity="0.95">
            <path d="M0,-14 Q0,0 14,0 Q0,0 0,14 Q0,0 -14,0 Q0,0 0,-14 Z" fill="#FFFFFF" />
          </g>

          {/* Sparkle Star 2 (Center Left) */}
          <circle cx="290" cy="340" r="16" fill="url(#pixieAura)" />
          <g transform="translate(290, 340)" opacity="0.9">
            <path d="M0,-16 Q0,0 16,0 Q0,0 0,16 Q0,0 -16,0 Q0,0 0,-16 Z" fill="#FFFFFF" />
          </g>

          {/* Sparkle Star 3 (Top Mid-Right) */}
          <circle cx="740" cy="95" r="20" fill="url(#pixieAura)" />
          <g transform="translate(740, 95)" opacity="1">
            <path d="M0,-18 Q0,0 18,0 Q0,0 0,18 Q0,0 -18,0 Q0,0 0,-18 Z" fill="#FFFFFF" />
          </g>

          {/* Sparkle Star 4 (Center) */}
          <circle cx="560" cy="240" r="12" fill="url(#pixieAura)" />
          <g transform="translate(560, 240)" opacity="0.85">
            <path d="M0,-12 Q0,0 12,0 Q0,0 0,12 Q0,0 -12,0 Q0,0 0,-12 Z" fill="#FFFFFF" />
          </g>

          {/* Sparkle Star 5 (Mid-Right) */}
          <circle cx="980" cy="190" r="15" fill="url(#pixieAura)" />
          <g transform="translate(980, 190)" opacity="0.9">
            <path d="M0,-15 Q0,0 15,0 Q0,0 0,15 Q0,0 -15,0 Q0,0 0,-15 Z" fill="#FFFFFF" />
          </g>

          {/* Sparkle Star 6 (Bottom Left) */}
          <circle cx="110" cy="480" r="11" fill="url(#pixieAura)" />
          <g transform="translate(110, 480)" opacity="0.8">
            <path d="M0,-10 Q0,0 10,0 Q0,0 0,10 Q0,0 -10,0 Q0,0 0,-10 Z" fill="#FFFFFF" />
          </g>

          {/* Sparkle Star 7 (Bottom Mid) */}
          <circle cx="510" cy="490" r="14" fill="url(#pixieAura)" />
          <g transform="translate(510, 490)" opacity="0.85">
            <path d="M0,-13 Q0,0 13,0 Q0,0 0,13 Q0,0 -13,0 Q0,0 0,-13 Z" fill="#FFFFFF" />
          </g>

          {/* Non-Uniform Micro Pixie Dust Specks */}
          <circle cx="85" cy="195" r="2.2" fill="#FFFFFF" opacity="0.9" />
          <circle cx="130" cy="260" r="1.5" fill="#FFFFFF" opacity="0.6" />
          <circle cx="210" cy="70" r="2.8" fill="#FFFFFF" opacity="0.85" />
          <circle cx="240" cy="170" r="1.8" fill="#FFFFFF" opacity="0.7" />
          <circle cx="360" cy="130" r="3.2" fill="#FFFFFF" opacity="0.95" />
          <circle cx="410" cy="220" r="2" fill="#FFFFFF" opacity="0.75" />
          <circle cx="460" cy="90" r="2.5" fill="#FFFFFF" opacity="0.8" />
          <circle cx="490" cy="330" r="1.6" fill="#FFFFFF" opacity="0.6" />
          <circle cx="630" cy="160" r="3" fill="#FFFFFF" opacity="0.9" />
          <circle cx="670" cy="310" r="2.2" fill="#FFFFFF" opacity="0.7" />
          <circle cx="710" cy="440" r="1.8" fill="#FFFFFF" opacity="0.65" />
          <circle cx="810" cy="180" r="2.6" fill="#FFFFFF" opacity="0.85" />
          <circle cx="870" cy="110" r="3.4" fill="#FFFFFF" opacity="0.95" />
          <circle cx="910" cy="280" r="2" fill="#FFFFFF" opacity="0.75" />
          <circle cx="1040" cy="120" r="2.8" fill="#FFFFFF" opacity="0.8" />
          <circle cx="1080" cy="240" r="1.6" fill="#FFFFFF" opacity="0.6" />
          <circle cx="1130" cy="90" r="2.4" fill="#FFFFFF" opacity="0.85" />
          <circle cx="220" cy="430" r="2.5" fill="#FFFFFF" opacity="0.7" />
          <circle cx="380" cy="450" r="1.8" fill="#FFFFFF" opacity="0.65" />
          <circle cx="420" cy="540" r="2.8" fill="#FFFFFF" opacity="0.85" />
          <circle cx="600" cy="460" r="3.2" fill="#FFFFFF" opacity="0.9" />
          <circle cx="660" cy="530" r="1.8" fill="#FFFFFF" opacity="0.6" />
          <circle cx="760" cy="360" r="2.4" fill="#FFFFFF" opacity="0.75" />
          <circle cx="820" cy="490" r="2" fill="#FFFFFF" opacity="0.7" />
          <circle cx="950" cy="410" r="1.6" fill="#FFFFFF" opacity="0.55" />
          <circle cx="1020" cy="350" r="2.2" fill="#FFFFFF" opacity="0.7" />
          <circle cx="1110" cy="460" r="2.6" fill="#FFFFFF" opacity="0.8" />
        </svg>

        {/* BOTTOM RIGHT CORNER: Simple, Minimalist & Precise Logo & Text with "Analytics" underneath */}
        <div
          style={{
            position: 'absolute',
            bottom: '72px',
            right: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '22px',
          }}
        >
          {/* Logo Mark */}
          {logoBase64 ? (
            <img
              src={logoBase64}
              alt="Triangle Analytics"
              width="68"
              height="68"
              style={{
                width: '68px',
                height: '68px',
                objectFit: 'contain',
              }}
            />
          ) : (
            <div
              style={{
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
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
                fontSize: '48px',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                color: '#1E1E1C',
                lineHeight: 1,
              }}
            >
              The Triangle
            </span>
            <span
              style={{
                fontSize: '22px',
                fontWeight: 500,
                letterSpacing: '0.04em',
                color: '#5C5457',
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
