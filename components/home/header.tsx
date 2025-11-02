"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-lg bg-slate-950/40 border-b border-cyan-500/10 px-3 sm:px-4 md:px-6 py-3 sm:py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          F.P SERVER
        </div>

        <div className="w-full sm:flex-1 sm:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 bg-slate-800/50 border-cyan-500/20 text-white placeholder-gray-500 focus:border-cyan-500/50 text-sm"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
