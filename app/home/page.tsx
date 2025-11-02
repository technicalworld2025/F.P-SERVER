"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/home/header"
import FamilyList from "@/components/home/family-list"
import Navigation from "@/components/home/navigation"
import ContactsSection from "@/components/home/contacts-section"
import ProfileSettings from "@/components/home/profile-settings"
import AddMemberModal, { type NewMember } from "@/components/home/add-member-modal"

const INITIAL_MEMBERS = [
  {
    id: 1,
    name: "Ahmed Khan",
    role: "Father",
    avatar: "/man.jpg",
    phone: "01712345678",
    documents: {
      birth: "/generic-birth-certificate.png",
      nid: "/nid-card.jpg",
      passport: "/open-passport-stamps.png",
      chairman: "/chairman-certificate.jpg",
      school: "/school-certificate.jpg",
      college: "/college-certificate.jpg",
      work: "/work-certificate.jpg",
    },
  },
  {
    id: 2,
    name: "Fatima Khan",
    role: "Mother",
    avatar: "/diverse-woman-portrait.png",
    phone: "01798765432",
    documents: {
      birth: null,
      nid: "/nid-card.jpg",
      passport: null,
      chairman: null,
      school: "/school-certificate.jpg",
      college: null,
      work: null,
    },
  },
  {
    id: 3,
    name: "Karim Khan",
    role: "Brother",
    avatar: "/young-man.jpg",
    phone: "01823456789",
    documents: {
      birth: "/generic-birth-certificate.png",
      nid: "/nid-card.jpg",
      passport: "/open-passport-stamps.png",
      chairman: null,
      school: "/school-certificate.jpg",
      college: "/college-certificate.jpg",
      work: "/work-certificate.jpg",
    },
  },
  {
    id: 4,
    name: "Aisha Khan",
    role: "Sister",
    avatar: "/young-woman.jpg",
    phone: "01934567890",
    documents: {
      birth: "/generic-birth-certificate.png",
      nid: null,
      passport: "/open-passport-stamps.png",
      chairman: null,
      school: "/school-certificate.jpg",
      college: null,
      work: null,
    },
  },
  {
    id: 5,
    name: "Habib Khan",
    role: "Uncle",
    avatar: "/elder-man.jpg",
    phone: "01645678901",
    documents: {
      birth: "/generic-birth-certificate.png",
      nid: "/nid-card.jpg",
      passport: null,
      chairman: "/chairman-certificate.jpg",
      school: "/school-certificate.jpg",
      college: "/college-certificate.jpg",
      work: "/work-certificate.jpg",
    },
  },
  {
    id: 6,
    name: "Noor Khan",
    role: "Cousin",
    avatar: "/young-woman-smiling.png",
    phone: "01756789012",
    documents: {
      birth: null,
      nid: "/nid-card.jpg",
      passport: null,
      chairman: null,
      school: "/school-certificate.jpg",
      college: null,
      work: null,
    },
  },
]

const FallingStarsBackground = () => {
  const stars = Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    duration: 12 + Math.random() * 8,
    delay: Math.random() * 5,
    size: 1 + Math.random() * 2,
    opacity: 0.3 + Math.random() * 0.7,
    color: ["cyan", "purple", "blue"][Math.floor(Math.random() * 3)],
  }))

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />

      {/* Ambient glow orbs */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/3 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "12s", animationDelay: "4s" }}
        />
      </div>

      {/* Falling stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full animate-spin`}
          style={{
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor:
              star.color === "cyan"
                ? "rgb(34, 211, 238)"
                : star.color === "purple"
                  ? "rgb(168, 85, 247)"
                  : "rgb(59, 130, 246)",
            opacity: star.opacity,
            animation: `fall ${star.duration}s linear ${star.delay}s infinite`,
            boxShadow: `0 0 ${star.size * 4}px ${star.color === "cyan" ? "rgb(34, 211, 238)" : star.color === "purple" ? "rgb(168, 85, 247)" : "rgb(59, 130, 246)"}`,
          }}
        />
      ))}

      <style>{`
        @keyframes fall {
          from {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          to {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

const ServerAntennaIcon = () => {
  return (
    <div className="flex justify-center items-center mb-4">
      <svg width="80" height="80" viewBox="0 0 80 80" className="drop-shadow-lg">
        {/* Main antenna pole */}
        <rect x="37" y="20" width="6" height="35" fill="url(#metalGradient)" rx="3" />

        {/* Antenna tips */}
        <line x1="40" y1="20" x2="28" y2="10" stroke="url(#antennaGradient)" strokeWidth="2" strokeLinecap="round" />
        <line x1="40" y1="20" x2="52" y2="10" stroke="url(#antennaGradient)" strokeWidth="2" strokeLinecap="round" />

        {/* Signal waves */}
        <circle
          cx="40"
          cy="50"
          r="8"
          fill="none"
          stroke="rgb(34, 211, 238)"
          strokeWidth="1"
          opacity="0.6"
          className="animate-pulse"
          style={{ animationDuration: "1.5s" }}
        />
        <circle
          cx="40"
          cy="50"
          r="14"
          fill="none"
          stroke="rgb(34, 211, 238)"
          strokeWidth="1"
          opacity="0.4"
          className="animate-pulse"
          style={{ animationDuration: "1.5s", animationDelay: "0.3s" }}
        />
        <circle
          cx="40"
          cy="50"
          r="20"
          fill="none"
          stroke="rgb(34, 211, 238)"
          strokeWidth="1"
          opacity="0.2"
          className="animate-pulse"
          style={{ animationDuration: "1.5s", animationDelay: "0.6s" }}
        />

        {/* Base */}
        <rect x="30" y="52" width="20" height="15" fill="url(#baseGradient)" rx="2" />
        <rect x="32" y="54" width="5" height="6" fill="rgb(55, 65, 81)" />
        <rect x="43" y="54" width="5" height="6" fill="rgb(55, 65, 81)" />

        {/* Gradients */}
        <defs>
          <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%">
            <stop offset="0%" style={{ stopColor: "rgb(209, 213, 219)", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "rgb(107, 114, 128)", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "rgb(209, 213, 219)", stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="antennaGradient" x1="0%" y1="0%" x2="100%">
            <stop offset="0%" style={{ stopColor: "rgb(34, 211, 238)", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "rgb(59, 130, 246)", stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="baseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "rgb(75, 85, 99)", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "rgb(31, 41, 55)", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [members, setMembers] = useState(INITIAL_MEMBERS)

  const handleAddMember = (newMember: NewMember) => {
    const member = {
      id: Math.max(...members.map((m) => m.id), 0) + 1,
      ...newMember,
    }
    setMembers([...members, member])
    setSearchQuery(newMember.name)
  }

  return (
    <div className="min-h-screen relative overflow-hidden pb-20 sm:pb-24">
      <FallingStarsBackground />

      <div className="relative z-10">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <main className="px-3 sm:px-4 md:px-6 py-4 sm:py-6">
          {activeTab === "home" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center py-6 sm:py-8">
                <ServerAntennaIcon />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  F.P SERVER
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-400">আপনার পরিবারের সাথে সংযুক্ত থাকুন</p>
              </div>

              <FamilyList members={members} searchQuery={searchQuery} />

              {searchQuery === "" && (
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    সদস্য যোগ করুন
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === "contacts" && <ContactsSection members={members} />}

          {activeTab === "profile" && <ProfileSettings />}
        </main>
      </div>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <AddMemberModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAddMember} />
    </div>
  )
}
