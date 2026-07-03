"use client"

import { useEffect, useState } from "react"
import WhatsAppLogo from "@/component-library/svg/whatsapp.png"
import InstagramLogo from "@/component-library/svg/instagram.png"
import HumantixLogo from "@/component-library/svg/humantix.png"

export default function Home() {
  const [vh, s_vh] = useState(0)
  useEffect(() => {
    s_vh(window.innerHeight * 0.01)
  }, [])

  return (
    <div
      style={{
        height: `calc(var(--vh, ${vh}px) * 100)`,
        backgroundColor: "#010",
      }}
    >
      <main className="flex h-full flex-center items-center sm:items-start">
        <Electron />
      </main>
    </div>
  )
}

const Electron = () => {
  useEffect(() => {
    const polygon = document.querySelector("polygon") as SVGPolygonElement
    const length = polygon.getTotalLength()
    polygon.style.strokeDasharray = String(length)
    polygon.style.strokeDashoffset = String(length)
  }, [])

  return (
    <>
      <style>{svgAnimation}</style>
      <LogoLink
        text="Join our community"
        src={WhatsAppLogo.src}
        alt="WhatsApp Logo"
        href="https://chat.whatsapp.com/KI2rCCnikhPAvAwN0AKiUk"
        style={{ top: 20, left: 20 }}
      />
      {new Date() < new Date("2026-06-08") && (
        <LogoLink
          text="Next Event"
          src={HumantixLogo.src}
          alt="Humanitix Logo"
          href="https://events.humanitix.com/kings-b-day-open-decks-take-over_electron-dance"
          style={{ top: "calc(30% + 16px)", left: "calc(33% + 24px)" }}
        />
      )}
      <LogoLink
        text="Follow our Instagram"
        src={InstagramLogo.src}
        alt="Instagram Logo"
        href="https://www.instagram.com/electron.dance/"
        style={{ top: 20, right: 20 }}
      />
      <a
        href="/gigs"
        className="fade-in"
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          right: 20,
          opacity: 0,
          width: "clamp(50px, 10vw, 80px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          textDecoration: "none",
        }}
      >
        <svg width="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gig-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6ec4" />
              <stop offset="100%" stopColor="#7873f5" />
            </linearGradient>
          </defs>
          <rect x="9" y="2" width="6" height="10" rx="3" fill="url(#gig-gradient)" />
          <path fill="url(#gig-gradient)" d="M5 10a7 7 0 0 0 14 0h-2a5 5 0 0 1-10 0H5z" />
          <rect x="11" y="17" width="2" height="4" fill="url(#gig-gradient)" />
          <rect x="8" y="21" width="8" height="1.5" rx="0.75" fill="url(#gig-gradient)" />
        </svg>
        <p style={{ color: "#ff6ec4", lineHeight: 0.8, fontSize: "clamp(10px, 1.5vw, 14px)", textAlign: "center", margin: 0 }}>
          Gigs
        </p>
      </a>
      <a
        href="sms:+19206898256"
        className="fade-in"
        style={{
          position: "absolute",
          bottom: 48,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0,
          width: "clamp(50px, 10vw, 80px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          textDecoration: "none",
        }}
      >
        <svg width="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sms-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6ec4" />
              <stop offset="100%" stopColor="#7873f5" />
            </linearGradient>
          </defs>
          <path fill="url(#sms-gradient)" d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          <rect x="6" y="8.5" width="12" height="1.8" rx="0.9" fill="white" opacity="0.85" />
          <rect x="6" y="12" width="8" height="1.8" rx="0.9" fill="white" opacity="0.85" />
        </svg>
        <p style={{ color: "#ff6ec4", lineHeight: 0.8, fontSize: "clamp(10px, 1.5vw, 14px)", textAlign: "center", margin: 0 }}>
          Msg our bot
        </p>
      </a>
      <a
        href="https://drive.google.com/drive/folders/1CSmJuAQc9KpeMThfrrWbqezVcet2MNH1?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="fade-in"
        style={{
          position: "absolute",
          bottom: 60,
          right: 20,
          opacity: 0,
          width: "clamp(50px, 10vw, 80px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          textDecoration: "none",
        }}
      >
        <svg width="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mix-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6ec4" />
              <stop offset="100%" stopColor="#7873f5" />
            </linearGradient>
          </defs>
          <path fill="url(#mix-gradient)" d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2" />
          <path fill="url(#mix-gradient)" fillRule="evenodd" d="M9 3v10H8V3z" />
          <path fill="url(#mix-gradient)" d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5z" />
        </svg>
        <p style={{ color: "#ff6ec4", lineHeight: 0.8, fontSize: "clamp(10px, 1.5vw, 14px)", textAlign: "center", margin: 0 }}>
          Mixs
        </p>
      </a>
      <a
        href="https://beta.electron.dance/events"
        target="_blank"
        rel="noopener noreferrer"
        className="fade-in"
        style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0,
          width: "clamp(50px, 10vw, 80px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          textDecoration: "none",
        }}
      >
        <svg width="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="beta-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6ec4" />
              <stop offset="100%" stopColor="#7873f5" />
            </linearGradient>
          </defs>
          <rect x="8" y="2" width="8" height="2.5" rx="1.25" fill="url(#beta-gradient)" />
          <path fill="url(#beta-gradient)" d="M10 4.5h4v5l6 12H4l6-12V4.5z" opacity="0.9" />
          <circle cx="10" cy="17" r="1.5" fill="white" opacity="0.3" />
          <circle cx="14.5" cy="19.5" r="1" fill="white" opacity="0.25" />
        </svg>
        <p style={{ color: "#ff6ec4", lineHeight: 0.8, fontSize: "clamp(10px, 1.5vw, 14px)", textAlign: "center", margin: 0 }}>
          Beta
        </p>
      </a>
      <a
        href="https://listen.electron.haus/app/"
        target="_blank"
        rel="noopener noreferrer"
        className="fade-in"
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: 20,
          opacity: 0,
          width: "clamp(50px, 10vw, 80px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          textDecoration: "none",
        }}
      >
        <svg width="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="listen-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6ec4" />
              <stop offset="100%" stopColor="#7873f5" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="10" fill="url(#listen-gradient)" />
          <path d="M6.5 10 Q12 7.5 17.5 10" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M7.5 13 Q12 10.5 16.5 13" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M8.5 16 Q12 14 15.5 16" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </svg>
        <p style={{ color: "#ff6ec4", lineHeight: 0.8, fontSize: "clamp(10px, 1.5vw, 14px)", textAlign: "center", margin: 0 }}>
          Listen
        </p>
      </a>
      <a
        href="https://cards.electron.dance"
        target="_blank"
        rel="noopener noreferrer"
        className="fade-in"
        style={{
          position: "absolute",
          bottom: 60,
          left: 20,
          opacity: 0,
          width: "clamp(50px, 10vw, 80px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          textDecoration: "none",
        }}
      >
        <svg width="100%" viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="djc-card" x1="0%" y1="0%" x2="100%" y2="100%">
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
          <circle cx="80" cy="52" r="24" fill="none" stroke="#e2c97e" strokeWidth="1" opacity="1" />
          <circle cx="80" cy="52" r="18" fill="none" stroke="#e2c97e" strokeWidth="0.8" opacity="0.8" />
          <circle cx="80" cy="52" r="12" fill="none" stroke="#e2c97e" strokeWidth="0.6" opacity="0.6" />
          <circle cx="80" cy="52" r="8" fill="#c4b5fd" />
          <circle cx="80" cy="52" r="2.5" fill="#3d1a80" />
        </svg>
        <p style={{ color: "#ff6ec4", lineHeight: 0.8, fontSize: "clamp(10px, 1.5vw, 14px)", textAlign: "center", margin: 0 }}>
          DJ Cards
        </p>
      </a>
      <a
        href="https://soundcloud.com/electrondancesyd"
        target="_blank"
        rel="noopener noreferrer"
        className="fade-in"
        style={{
          position: "absolute",
          bottom: "25%",
          right: 20,
          opacity: 0,
          width: "clamp(50px, 10vw, 80px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          textDecoration: "none",
        }}
      >
        <svg width="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sc-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6ec4" />
              <stop offset="100%" stopColor="#7873f5" />
            </linearGradient>
          </defs>
          <path fill="url(#sc-gradient)" d="M23.999 14.165c-.052 1.796-1.612 3.169-3.4 3.169h-8.18a.68.68 0 0 1-.675-.683V7.862a.747.747 0 0 1 .452-.724s.75-.513 2.333-.513a5.364 5.364 0 0 1 2.763.755 5.433 5.433 0 0 1 2.57 3.54c.282-.08.574-.121.868-.12.884 0 1.73.358 2.347.992s.948 1.49.922 2.373ZM10.721 8.421c.247 2.98.427 5.697 0 8.672a.264.264 0 0 1-.53 0c-.395-2.946-.22-5.718 0-8.672a.264.264 0 0 1 .53 0ZM9.072 9.448c.285 2.659.37 4.986-.006 7.655a.277.277 0 0 1-.55 0c-.331-2.63-.256-5.02 0-7.655a.277.277 0 0 1 .556 0Zm-1.663-.257c.27 2.726.39 5.171 0 7.904a.266.266 0 0 1-.532 0c-.38-2.69-.257-5.21 0-7.904a.266.266 0 0 1 .532 0Zm-1.647.77a26.108 26.108 0 0 1-.008 7.147.272.272 0 0 1-.542 0 27.955 27.955 0 0 1 0-7.147.275.275 0 0 1 .55 0Zm-1.67 1.769c.421 1.865.228 3.5-.029 5.388a.257.257 0 0 1-.514 0c-.21-1.858-.398-3.549 0-5.389a.272.272 0 0 1 .543 0Zm-1.655-.273c.388 1.897.26 3.508-.01 5.412-.026.28-.514.283-.54 0-.244-1.878-.347-3.54-.01-5.412a.283.283 0 0 1 .56 0Zm-1.668.911c.4 1.268.257 2.292-.026 3.572a.257.257 0 0 1-.514 0c-.241-1.262-.354-2.312-.023-3.572a.283.283 0 0 1 .563 0Z"/>
        </svg>
        <p style={{ color: "#ff6ec4", lineHeight: 0.8, fontSize: "clamp(10px, 1.5vw, 14px)", textAlign: "center", margin: 0 }}>
          SoundCloud
        </p>
      </a>
      <svg
        width="100%"
        height="100%"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 907.1 907.1"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="modernGradient_pink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6ec4" />
            <stop offset="100%" stopColor="#7873f5" />
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="modernGradient_blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4facfe" />
            <stop offset="100%" stopColor="#00f2fe" />
          </linearGradient>
        </defs>
        <g fill="url(#modernGradient_pink)" stroke="aliceblue" strokeWidth="2" strokeLinejoin="round">
          <polygon points="708.6,453.5 623.6,368.6 538.5,28.4 453.6,198.5 368.6,28.4 334.5,164.4 368.6,113.4 538.5,283.5 878.7,368.6 711.2,453.5 715.1,447.2 793.1,368.9 538.5,198.5 368.6,198.5 283.5,283.5 283.5,368.6 113.4,538.5 368.6,708.6 453.5,708.6 453.5,708.6 538.5,793.7 572.4,743.6 538.5,878.8 453.6,708.6 538.5,623.6 607.2,605.7 623.6,538.5 708.6,453.5 878.7,538.5 744.5,572.1 793.7,538.5 708.6,453.5 708.6,538.4 641.9,639.3 538.5,708.6 453.5,708.6 368.4,623.6 28.3,538.5 191.1,457.4 192.6,450.6 28.3,368.6 164.6,334.4 113.4,368.4 283.5,538.5 368.6,878.8 451.8,712.2 369.5,792.2 198.5,538.5 198.5,368.6 283.5,283.5 368.6,283.5 538.5,113.4 708.6,368.6" />
        </g>
        <text
          x="460"
          y="470"
          style={{
            // fill: 'aliceblue',
            // fill: '#7873f5',
            fill: "url(#modernGradient_pink)",
          }}
        >
          Hello you&apos;s
        </text>
      </svg>
    </>
  )
}
const svgAnimation = ` 
      text {
        font-family: 'Great Vibes', cursive;
        font-size: 48px;
        fill: black;
        dominant-baseline: middle;
        text-anchor: middle;
        opacity: 0;
        animation: appear  1s ease-in 4s forwards;
      }

      polygon {
        fill-opacity: 0;
        transform: rotate(0deg);
        transform-origin: 50% 50%;
        stroke-dasharray: 5552.15478515625;
        stroke-dashoffset: 5552.15478515625;
        animation: draw 4s ease-out forwards, fill 1s ease-in 4s forwards, spin 4s ease-out forwards;
      }

      @keyframes draw {
        to {
          stroke-dashoffset: 0;
        }
      }
      @keyframes fill {
        to {
          fill-opacity: 0.75;
        }
      }
      @keyframes spin {
        to {
          transform: rotate(45deg)
        }
      }
      
      @keyframes appear {
        to {
          opacity: 1;
        }
      }
      .fade-in {
        animation: appear  1s ease-in 4s forwards;
      }
      
`

const LogoLink: React.FC<{
  src: string
  alt: string
  href: string
  text: string
  style?: React.CSSProperties
}> = ({ src, alt, href, text, style = {} }) => (
  <a
    style={{
      maxHeight: 80,
      position: "absolute",
      maxWidth: 80,
      opacity: 0,
      width: "clamp(50px, 10vw, 80px)",
      height: "clamp(50px, 10vw, 80px)",
      ...style,
    }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="fade-in"
  >
    <img
      src={src}
      alt={alt}
      style={{
        animation: "appear 1s ease-in 4s forards",
      }}
    />
    <p style={{ color: "#ff6ec4", lineHeight: 0.8, fontSize: "clamp(10px, 1.5vw, 14px)", textAlign: "center" }}>
      {text}
    </p>
  </a>
)