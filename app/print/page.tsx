"use client"

import { useEffect, useState } from "react"
import QRCode from "qrcode"
import Image from "next/image"
import WhatsAppLogo from "@/component-library/svg/whatsapp.png"
import InstagramLogo from "@/component-library/svg/instagram.png"

const links = [
  {
    label: "DJ Cards",
    url: "https://cards.electron.dance",
    icon: "djcards",
    color: "#a78bfa",
  },
  {
    label: "Mixes",
    url: "https://drive.google.com/drive/folders/1CSmJuAQc9KpeMThfrrWbqezVcet2MNH1?usp=sharing",
    icon: "mixes",
    color: "#ff6ec4",
  },
  {
    label: "WhatsApp",
    url: "https://chat.whatsapp.com/KI2rCCnikhPAvAwN0AKiUk",
    icon: "whatsapp",
    color: "#25d366",
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/electron.dance/",
    icon: "instagram",
    color: "#e1306c",
  },
]

export default function PrintPage() {
  const [qrCodes, setQrCodes] = useState<Record<string, string>>({})

  useEffect(() => {
    Promise.all(
      links.map(async ({ label, url }) => {
        const dataUrl = await QRCode.toDataURL(url, {
          width: 240,
          margin: 2,
          color: { dark: "#1a0a2e", light: "#ffffff" },
        })
        return [label, dataUrl] as const
      })
    ).then((entries) => setQrCodes(Object.fromEntries(entries)))
  }, [])

  return (
    <>
      <style>{printStyles}</style>
      <div className="print-page">
        <div className="grid">
          {links.map(({ label, url, icon, color }) => (
            <div key={label} className="card">
              <div className="icon-wrap">
                <Icon type={icon} color={color} />
              </div>
              <p className="label" style={{ color }}>
                {label}
              </p>
              <p className="url">{url}</p>
              {qrCodes[label] ? (
                <img src={qrCodes[label]} alt={`QR code for ${label}`} className="qr" />
              ) : (
                <div className="qr qr-placeholder" />
              )}
            </div>
          ))}
        </div>
        <p className="footer">electron.dance</p>
      </div>
    </>
  )
}

const Icon = ({ type, color }: { type: string; color: string }) => {
  if (type === "whatsapp") {
    return <Image src={WhatsAppLogo} alt="WhatsApp" width={80} height={80} />
  }
  if (type === "instagram") {
    return <Image src={InstagramLogo} alt="Instagram" width={80} height={80} />
  }
  if (type === "mixes") {
    return (
      <svg width="80" height="80" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mix-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6ec4" />
            <stop offset="100%" stopColor="#7873f5" />
          </linearGradient>
        </defs>
        <path fill="url(#mix-g)" d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2" />
        <path fill="url(#mix-g)" fillRule="evenodd" d="M9 3v10H8V3z" />
        <path fill="url(#mix-g)" d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5z" />
      </svg>
    )
  }
  // djcards
  return (
    <svg width="80" height="60" viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="djc-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a0060" />
          <stop offset="100%" stopColor="#1a0a2e" />
        </linearGradient>
      </defs>
      <g transform="rotate(-18 80 110)">
        <rect x="30" y="10" width="68" height="95" rx="8" fill="#2d1060" stroke="#a78bfa" strokeWidth="1.5" />
        <rect x="30" y="10" width="6" height="95" rx="3" fill="#a78bfa" />
      </g>
      <g transform="rotate(18 80 110)">
        <rect x="62" y="10" width="68" height="95" rx="8" fill="#2d1060" stroke="#a78bfa" strokeWidth="1.5" />
        <rect x="62" y="10" width="6" height="95" rx="3" fill="#a78bfa" />
      </g>
      <rect x="46" y="8" width="68" height="95" rx="8" fill="#3d1580" stroke="#e2c97e" strokeWidth="2" />
      <rect x="46" y="8" width="6" height="95" rx="3" fill="#e2c97e" />
      <circle cx="80" cy="52" r="26" fill="#3d1a80" />
      <circle cx="80" cy="52" r="24" fill="none" stroke="#e2c97e" strokeWidth="1" />
      <circle cx="80" cy="52" r="18" fill="none" stroke="#e2c97e" strokeWidth="0.8" opacity="0.8" />
      <circle cx="80" cy="52" r="12" fill="none" stroke="#e2c97e" strokeWidth="0.6" opacity="0.6" />
      <circle cx="80" cy="52" r="8" fill="#c4b5fd" />
      <circle cx="80" cy="52" r="2.5" fill="#3d1a80" />
    </svg>
  )
}

const printStyles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #0a0015; }

  .print-page {
    min-height: 100vh;
    background: #0a0015;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
    font-family: 'Inter', sans-serif;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    max-width: 680px;
    width: 100%;
  }

  .card {
    background: #12002e;
    border: 1px solid #2d1060;
    border-radius: 16px;
    padding: 28px 20px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
  }

  .label {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  .url {
    font-size: 9px;
    color: #6b6b8a;
    word-break: break-all;
    text-align: center;
  }

  .qr {
    width: 180px;
    height: 180px;
    border-radius: 8px;
    display: block;
  }

  .qr-placeholder {
    background: #1a0a2e;
  }

  .footer {
    margin-top: 32px;
    color: #3d2060;
    font-size: 13px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  @media print {
    @page { margin: 0; }

    body { background: white; }

    .print-page {
      background: white;
      padding: 20px;
      min-height: unset;
    }

    .card {
      background: white;
      border-color: #ddd;
      break-inside: avoid;
    }

    .label { color: #1a0a2e !important; }
    .url { color: #555; }
    .footer { color: #aaa; }

    .qr {
      filter: none;
    }
  }
`
