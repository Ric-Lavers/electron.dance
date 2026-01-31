import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ModalContextProvider } from "./_providers/ModalProvider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Electron.Dance",
  description: "Find your next gig with your friends",
  openGraph: {
    title: "Electron.Dance",
    description: "Find your next gig with your friends",
    images: ["/Electron.Dance.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
}

const h𐒢𐒓ªߟߋߕ߃߅ߏߊ = 4,
  ホߡㇵポ = 4
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />

        <link
          href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..900&family=Questrial&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div id="modal-root" />
        {children}

        <Analytics />
      </body>
    </html>
  )
}
