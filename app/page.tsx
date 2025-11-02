"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LandingPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [stars, setStars] = useState<
    Array<{ id: number; left: number; delay: number; duration: number; size: number }>
  >([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)
    handleResize()

    const generatedStars = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 8 + 12, // 12-20 seconds for slow motion
      size: Math.random() * 2 + 0.5, // Variable star sizes
    }))
    setStars(generatedStars)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden flex items-center justify-center">
      <style>{`
        @keyframes fall-star {
          0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            transform: translateY(120vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        .falling-star {
          animation: fall-star linear infinite;
        }

        .stars-layer {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .glow-orb {
          animation: pulse-glow 4s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 from-0% via-blue-950/30 via-50% to-slate-900 to-100%">
        <div
          className="absolute inset-0 bg-radial-gradient opacity-40"
          style={{
            background: "radial-gradient(ellipse at center, rgba(30,58,138,0.2) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden stars-layer">
        {stars.map((star) => (
          <div
            key={star.id}
            className="falling-star absolute rounded-full shadow-lg"
            style={{
              left: `${star.left}%`,
              top: "-50px",
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.id % 3 === 0 ? "#06B6D4" : star.id % 3 === 1 ? "#A78BFA" : "#60A5FA",
              boxShadow:
                star.id % 3 === 0 ? "0 0 8px #06B6D4" : star.id % 3 === 1 ? "0 0 8px #A78BFA" : "0 0 8px #60A5FA",
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              opacity: Math.random() * 0.6 + 0.4,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 stars-layer pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl glow-orb" />
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl glow-orb"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl glow-orb"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {!isMobile && (
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-3xl opacity-5 transition-all duration-300"
          style={{
            left: `${mousePos.x - 192}px`,
            top: `${mousePos.y - 192}px`,
            pointerEvents: "none",
          }}
        />
      )}

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <div className="mb-6 sm:mb-8 inline-block p-2 sm:p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
          <div className="text-cyan-400 font-semibold text-xs sm:text-sm">Welcome to the Future</div>
        </div>

        <div className="flex items-center justify-center mb-4 sm:mb-6">
          <svg
            viewBox="0 0 100 100"
            className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="45" y="50" width="10" height="40" fill="currentColor" rx="2" />
            <rect x="35" y="88" width="30" height="6" fill="currentColor" rx="1" />
            <line x1="35" y1="50" x2="20" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="65" y1="50" x2="80" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="50" y2="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <circle cx="50" cy="50" r="3" fill="currentColor" />
          </svg>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
          F.P SERVER
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-3 sm:mb-4">
          Connect with your family and community seamlessly
        </p>

        <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-8 sm:mb-12">
          Share documents, stay connected, and manage your digital presence all in one place
        </p>

        <Link href="/home">
          <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-lg rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
            Get Started
          </Button>
        </Link>
      </div>

      <div
        className="hidden md:block absolute bottom-10 left-10 w-32 h-32 border border-cyan-500/20 rounded-full opacity-50 animate-spin"
        style={{ animationDuration: "20s" }}
      />
      <div
        className="hidden md:block absolute top-20 right-10 w-24 h-24 border border-purple-500/20 rounded-full opacity-50 animate-spin"
        style={{ animationDuration: "15s", animationDirection: "reverse" }}
      />
    </div>
  )
}
