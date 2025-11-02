"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface AddMemberModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (member: NewMember) => void
}

export interface NewMember {
  name: string
  phone: string
  role: string
  avatar: string
  documents: Record<string, string | null>
}

const DOCUMENT_TYPES = [
  { key: "birth", label: "জন্ম সার্টিফিকেট" },
  { key: "nid", label: "জাতীয় পরিচয়পত্র" },
  { key: "passport", label: "পাসপোর্ট" },
  { key: "chairman", label: "চেয়ারম্যান সার্টিফিকেট" },
  { key: "school", label: "স্কুল সার্টিফিকেট" },
  { key: "college", label: "কলেজ সার্টিফিকেট" },
  { key: "work", label: "কর্মসংস্থান সার্টিফিকেট" },
]

export default function AddMemberModal({ isOpen, onClose, onSubmit }: AddMemberModalProps) {
  const [formData, setFormData] = useState<NewMember>({
    name: "",
    phone: "",
    role: "",
    avatar: "/diverse-group.png",
    documents: {
      birth: null,
      nid: null,
      passport: null,
      chairman: null,
      school: null,
      college: null,
      work: null,
    },
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleDocumentChange = (docKey: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docKey]: value || null,
      },
    }))
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.phone) {
      alert("অনুগ্রহ করে নাম এবং ফোন নম্বর পূরণ করুন")
      return
    }

    onSubmit(formData)
    setFormData({
      name: "",
      phone: "",
      role: "",
      avatar: "/diverse-group.png",
      documents: {
        birth: null,
        nid: null,
        passport: null,
        chairman: null,
        school: null,
        college: null,
        work: null,
      },
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-cyan-500/30">
        <div className="sticky top-0 bg-slate-900 border-b border-cyan-500/20 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">নতুন সদস্য যোগ করুন</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">নাম</label>
            <Input
              placeholder="সম্পূর্ণ নাম লিখুন"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="bg-slate-800 border-cyan-500/20 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">ফোন নম্বর</label>
            <Input
              placeholder="০১X-XXXX-XXXX"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="bg-slate-800 border-cyan-500/20 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">পরিচয় (যেমন - পিতা, মাতা ইত্যাদি)</label>
            <Input
              placeholder="পারিবারিক সম্পর্ক"
              value={formData.role}
              onChange={(e) => handleInputChange("role", e.target.value)}
              className="bg-slate-800 border-cyan-500/20 text-white"
            />
          </div>

          <div className="border-t border-cyan-500/10 pt-4">
            <h3 className="text-lg font-semibold text-white mb-4">নথিপত্র আপলোড করুন</h3>
            <div className="space-y-3">
              {DOCUMENT_TYPES.map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
                  <Input
                    placeholder="Google Drive লিঙ্ক বা ইমেজ URL পেস্ট করুন"
                    value={formData.documents[key] || ""}
                    onChange={(e) => handleDocumentChange(key, e.target.value)}
                    className="bg-slate-800 border-cyan-500/20 text-white text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-cyan-500/10">
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
            >
              জমা দিন
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
              বন্ধ করুন
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
