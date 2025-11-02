"use client"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface FamilyMember {
  id: number
  name: string
  role: string
  avatar: string
  phone?: string
  documents?: Record<string, string | null>
}

interface FamilyListProps {
  members: FamilyMember[]
  searchQuery: string
}

export default function FamilyList({ members, searchQuery }: FamilyListProps) {
  const filteredMembers = members.filter((member) => member.name.toLowerCase().includes(searchQuery.toLowerCase()))

  if (searchQuery && filteredMembers.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-gray-400 text-center mb-4">দুঃখিত, "{searchQuery}" নামে কোনো সদস্য পাওয়া যায় নি</p>
        <p className="text-gray-500 text-sm text-center">
          যদি আপনি নতুন কোনো সদস্য যোগ করতে চান তাহলে নিচে "সদস্য যোগ করুন" বাটন ব্যবহার করুন
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {filteredMembers.map((member) => (
        <Link key={member.id} href={`/profile/${member.id}`}>
          <Card className="bg-slate-800/50 border-cyan-500/20 hover:border-cyan-500/50 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer overflow-hidden group h-full">
            <div className="relative h-24 sm:h-32 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-purple-500/20 to-transparent group-hover:scale-105 transition-transform duration-300" />
            </div>

            <div className="px-3 sm:px-4 pt-0 pb-3 sm:pb-4 -mt-8 sm:-mt-12 relative">
              <div className="flex items-end gap-3 sm:gap-4 mb-3 sm:mb-4">
                <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-slate-800 ring-2 ring-cyan-500/30">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-500 text-white">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-xs sm:text-sm text-gray-400">{member.role}</p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
