"use client"

import { Phone, Download } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Member {
  id: number
  name: string
  phone: string
  role: string
}

interface ContactsSectionProps {
  members: Member[]
}

export default function ContactsSection({ members }: ContactsSectionProps) {
  const handleCall = (phone: string) => {
    const cleanPhone = phone.replace(/\s/g, "")
    window.location.href = `tel:${cleanPhone}`
  }

  const handleDownloadContacts = () => {
    const csvContent = [["Name", "Phone", "Role"], ...members.map((m) => [m.name, m.phone, m.role])]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "family_contacts.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
          পরিচয়ের তথ্য
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-400">আপনার পরিবারের সদস্যদের সাথে সংযোগ করুন</p>
      </div>

      <div className="space-y-2 sm:space-y-3 max-w-2xl mx-auto px-1">
        {members.map((contact) => (
          <Card
            key={contact.id}
            className="bg-slate-800/50 border-cyan-500/20 hover:border-cyan-500/50 hover:bg-slate-800/70 transition-all duration-300 overflow-hidden"
          >
            <div className="flex items-center justify-between p-3 sm:p-4 gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
              <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border border-cyan-500/30 flex-shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-500 text-white text-xs">
                    {contact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm sm:text-base truncate">{contact.name}</h3>
                  <p className="text-xs text-gray-500">{contact.role}</p>
                  <p className="text-xs text-cyan-400 font-mono truncate">{contact.phone}</p>
                </div>
              </div>

              <Button
                onClick={() => handleCall(contact.phone)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white gap-1 sm:gap-2 flex-shrink-0 text-xs sm:text-sm"
                size="sm"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden md:inline">কল করুন</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Button
          onClick={handleDownloadContacts}
          className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white gap-2"
        >
          <Download className="w-4 h-4" />
          যোগাযোগের তথ্য ডাউনলোড করুন
        </Button>
      </div>
    </div>
  )
}
