"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import DocumentModal from "@/components/profile/document-modal"

const FAMILY_MEMBERS = [
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
    driveLinks: {
      birth: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
      nid: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
      passport: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
      chairman: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
      school: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
      college: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
      work: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
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
    driveLinks: {
      birth: null,
      nid: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
      passport: null,
      chairman: null,
      school: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
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
    driveLinks: {
      birth: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
      nid: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
      passport: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
      chairman: null,
      school: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
      college: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
      work: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
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
    driveLinks: {
      birth: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
      nid: null,
      passport: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
      chairman: null,
      school: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
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
    driveLinks: {
      birth: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
      nid: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
      passport: null,
      chairman: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
      school: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
      college: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
      work: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
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
    driveLinks: {
      birth: null,
      nid: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
      passport: null,
      chairman: null,
      school: "https://drive.google.com/uc?export=download&id=1_cknt08GNvlWrSeOE-utlCveUUveO-e_",
      college: null,
      work: null,
    },
  },
]

const DOCUMENT_TYPES = [
  { key: "birth", label: "জন্ম সার্টিফিকেট", icon: "📋" },
  { key: "nid", label: "জাতীয় পরিচয়পত্র", icon: "🆔" },
  { key: "passport", label: "পাসপোর্ট", icon: "📕" },
  { key: "chairman", label: "চেয়ারম্যান সার্টিফিকেট", icon: "📜" },
  { key: "school", label: "স্কুল সার্টিফিকেট", icon: "🎓" },
  { key: "college", label: "কলেজ সার্টিফিকেট", icon: "👨‍🎓" },
  { key: "work", label: "কর্মসংস্থান সার্টিফিকেট", icon: "💼" },
]

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [selectedDocument, setSelectedDocument] = useState<{
    url: string
    label: string
    driveLink: string | null
  } | null>(null)

  const memberId = Number.parseInt(params.id as string)
  const member = FAMILY_MEMBERS.find((m) => m.id === memberId)

  if (!member) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">সদস্য পাওয়া যায় নি</h1>
          <Button onClick={() => router.back()} className="bg-cyan-500 hover:bg-cyan-600">
            ফিরে যান
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pb-8">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
        <div
          className="absolute top-0 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        />
      </div>

      <div className="sticky top-0 z-20 bg-slate-950/40 backdrop-blur-lg border-b border-cyan-500/10 px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="text-gray-400 hover:text-cyan-400 gap-2 text-sm"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          ফিরে যান
        </Button>
      </div>

      {/* Cover Photo */}
      <div className="relative h-32 sm:h-48 md:h-64 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="px-3 sm:px-4 md:px-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 -mt-16 sm:-mt-20 mb-6 sm:mb-8 relative z-10">
          <Avatar className="w-28 h-28 sm:w-40 sm:h-40 border-4 border-slate-950 ring-4 ring-cyan-500/50">
            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
            <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-500 text-white text-xl sm:text-2xl">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2">{member.name}</h1>
            <p className="text-sm sm:text-lg text-gray-400 mb-3 sm:mb-4">{member.role}</p>
            <div className="flex gap-2">
              <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs sm:text-sm font-medium">
                পরিবারের সদস্য
              </div>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">নথিপত্র</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {DOCUMENT_TYPES.map(({ key, label, icon }) => {
              const documentKey = key as keyof typeof member.documents
              const documentUrl = member.documents[documentKey]
              const driveLink = (member as any).driveLinks?.[documentKey] || null
              const hasDocument = !!documentUrl

              return (
                <Card
                  key={key}
                  className={`p-4 cursor-pointer transition-all duration-300 border ${
                    hasDocument
                      ? "bg-slate-800/50 border-cyan-500/20 hover:border-cyan-500/50 hover:bg-slate-800/70"
                      : "bg-slate-800/30 border-slate-700/30 cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (hasDocument) {
                      setSelectedDocument({ url: documentUrl, label, driveLink })
                    }
                  }}
                >
                  <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{icon}</div>
                  <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">{label}</h3>
                  {hasDocument ? (
                    <p className="text-xs sm:text-sm text-cyan-400 font-medium">দেখতে ক্লিক করুন</p>
                  ) : (
                    <p className="text-xs sm:text-sm text-gray-500">ছবি পাওয়া যায় নি</p>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      <DocumentModal document={selectedDocument} onClose={() => setSelectedDocument(null)} />
    </div>
  )
}
