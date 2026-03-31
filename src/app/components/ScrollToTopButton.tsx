'use client'

import {ArrowUp} from 'lucide-react'

interface ScrollToTopButtonProps {
  className?: string
}

export function ScrollToTopButton({className = ''}: ScrollToTopButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      className={`inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[rgba(26,58,82,0.12)] bg-white px-5 py-3 font-semibold text-[#1A3A52] transition-all hover:border-[#C9A962]/40 hover:text-[#C9A962] hover:shadow-md ${className}`.trim()}
    >
      <ArrowUp className="h-4 w-4" />
      <span>Voltar ao topo</span>
    </button>
  )
}
