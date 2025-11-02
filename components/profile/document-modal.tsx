"use client"

import { X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface DocumentModalProps {
  document: { url: string; label: string; driveLink: string | null } | null
  onClose: () => void
}

export default function DocumentModal({ document, onClose }: DocumentModalProps) {
  if (!document) return null

  const handleDownload = () => {
    if (!document.driveLink) return

    const link = document.createElement("a")
    link.href = document.driveLink
    link.setAttribute("download", `${document.label}.pdf`)
    link.click()
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-slate-900 rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex justify-between z-10">
          <Button onClick={onClose} variant="ghost" className="text-gray-400 hover:text-white hover:bg-slate-800/50">
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>

          <Button
            onClick={handleDownload}
            className="bg-cyan-500 hover:bg-cyan-600 text-white gap-2 text-sm"
            disabled={!document.driveLink}
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">ডাউনলোড</span>
          </Button>
        </div>

        <div className="bg-slate-800/50 px-4 sm:px-6 py-3 sm:py-4 border-b border-cyan-500/10 mt-12 sm:mt-10">
          <h3 className="text-lg sm:text-xl font-bold text-white">{document.label}</h3>
        </div>

        <div className="relative w-full aspect-video bg-slate-950 flex items-center justify-center">
          <Image src={document.url || "/placeholder.svg"} alt={document.label} fill className="object-contain" />
        </div>

        <div className="bg-slate-800/30 px-4 sm:px-6 py-3 sm:py-4 border-t border-cyan-500/10 flex justify-end">
          <Button onClick={onClose} className="bg-slate-700 hover:bg-slate-600 text-white text-sm">
            বন্ধ করুন
          </Button>
        </div>
      </div>
    </div>
  )
}
