"use client"

import { useState } from "react"
import { Save, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface ProfileData {
  name: string
  role: string
  email: string
  phone: string
  bio: string
}

export default function ProfileSettings() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Your Name",
    role: "Family Member",
    email: "email@example.com",
    phone: "+880 1234567890",
    bio: "Tell us about yourself...",
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSaving(false)
    alert("Profile saved successfully!")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 px-1">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Profile Settings
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-400">Customize your profile</p>
      </div>

      <Card className="bg-slate-800/50 border-cyan-500/20 p-4 sm:p-6">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-cyan-500/30">
            <AvatarImage src="/placeholder.svg?key=profile" />
            <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-500 text-white text-2xl">
              YN
            </AvatarFallback>
          </Avatar>
          <Button className="bg-purple-500 hover:bg-purple-600 text-white gap-2 text-sm">
            <Upload className="w-4 h-4" />
            Change Avatar
          </Button>
        </div>
      </Card>

      <Card className="bg-slate-800/50 border-cyan-500/20 p-4 sm:p-6 space-y-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">Full Name</label>
          <Input
            value={profileData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="bg-slate-900/50 border-cyan-500/20 text-white placeholder-gray-600 focus:border-cyan-500/50 text-sm"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">Role</label>
          <Input
            value={profileData.role}
            onChange={(e) => handleInputChange("role", e.target.value)}
            className="bg-slate-900/50 border-cyan-500/20 text-white placeholder-gray-600 focus:border-cyan-500/50 text-sm"
            placeholder="Your role in family"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">Email</label>
          <Input
            type="email"
            value={profileData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="bg-slate-900/50 border-cyan-500/20 text-white placeholder-gray-600 focus:border-cyan-500/50 text-sm"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">Phone</label>
          <Input
            value={profileData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="bg-slate-900/50 border-cyan-500/20 text-white placeholder-gray-600 focus:border-cyan-500/50 text-sm"
            placeholder="+880 1234567890"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">Bio</label>
          <textarea
            value={profileData.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            className="w-full px-3 py-2 bg-slate-900/50 border border-cyan-500/20 text-white placeholder-gray-600 rounded-md focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 resize-none text-sm"
            placeholder="Tell us about yourself..."
            rows={4}
          />
        </div>

        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white gap-2 font-semibold py-5 text-sm"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Saving..." : "Save Profile"}
        </Button>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <Card className="bg-slate-800/50 border-cyan-500/20 p-4">
          <h4 className="font-semibold text-white text-sm mb-2">Privacy</h4>
          <p className="text-xs text-gray-400">Your profile information is visible only to family members.</p>
        </Card>
        <Card className="bg-slate-800/50 border-cyan-500/20 p-4">
          <h4 className="font-semibold text-white text-sm mb-2">Documents</h4>
          <p className="text-xs text-gray-400">Add your certificates and documents from your profile page.</p>
        </Card>
      </div>
    </div>
  )
}
