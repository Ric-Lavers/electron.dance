"use client"

import { useEffect, useState } from "react"

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
      <main style={{ border: "5px sold lime" }} className="flex h-full flex-center items-center sm:items-start">
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

    // const setRealVh = () => {
    //   const vh = window.innerHeight * 0.01;
    //   document.documentElement.style.setProperty('--vh', `${vh}px`);
    // };
    // setRealVh();
    // window.addEventListener('resize', setRealVh);
    // return () => window.removeEventListener('resize', setRealVh);
  }, [])

  return (
    <>
      <style>{svgAnimation}</style>
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
          y="420"
          style={{
            // fill: 'aliceblue',
            // fill: '#7873f5',
            fill: "url(#modernGradient_pink)",
          }}
        >
          Hello you,
        </text>
        <text
          onClick={() => window.open("/gigs")}
          x="460"
          y="500"
          style={{
            fill: "url(#modernGradient_pink)",
            cursor: "pointer",
          }}
        >
          looking for a gig?
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
`
