"use client"

import { Home, Users, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "contacts", label: "Contacts", icon: Users },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur-lg border-t border-cyan-500/10 px-3 sm:px-4 py-2 sm:py-3">
      <div className="flex justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant="ghost"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-2 sm:px-4 transition-all duration-300 ${
                activeTab === tab.id
                  ? "text-cyan-400 bg-cyan-500/10 border border-cyan-500/30"
                  : "text-gray-400 hover:text-cyan-400"
              }`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-xs font-medium">{tab.label}</span>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
