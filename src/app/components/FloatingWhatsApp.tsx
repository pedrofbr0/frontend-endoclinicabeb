import {MessageCircle} from 'lucide-react'

interface FloatingWhatsAppProps {
  phone?: string
}

const quickMessage = 'Ola! Gostaria de agendar uma avaliacao personalizada.'

export function FloatingWhatsApp({phone}: FloatingWhatsAppProps) {
  const whatsappNumber = phone?.replace(/\D/g, '')

  if (!whatsappNumber) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <a
        href={`https://wa.me/55${whatsappNumber}?text=${encodeURIComponent(quickMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full w-14 h-14 md:w-16 md:h-16 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 relative"
        aria-label="Conversar no WhatsApp"
      >
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8 animate-pulse" />
        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20" />
      </a>

      <div className="hidden md:block absolute right-full top-1/2 -translate-y-1/2 mr-4 bg-[#1A3A52] text-white px-5 py-3 rounded-xl whitespace-nowrap shadow-2xl border border-[#C9A962]/20 opacity-0 translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none">
        <span className="text-sm font-semibold">Fale conosco no WhatsApp!</span>
        <div className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2 border-8 border-transparent border-l-[#1A3A52]" />
      </div>
    </div>
  )
}
