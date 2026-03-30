'use client'

import {Check, Share2} from 'lucide-react'
import {useState} from 'react'

interface ShareArticleButtonProps {
  title: string
  text?: string
  url: string
  className?: string
  variant?: 'full' | 'icon'
}

type FeedbackState = 'idle' | 'copied' | 'shared' | 'error'

function resolveShareUrl(url: string) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  if (typeof window === 'undefined') {
    return url
  }

  return new URL(url, window.location.origin).toString()
}

export function ShareArticleButton({
  title,
  text,
  url,
  className,
  variant = 'full',
}: ShareArticleButtonProps) {
  const [feedback, setFeedback] = useState<FeedbackState>('idle')

  function shouldUseNativeShare() {
    if (typeof window === 'undefined' || typeof navigator.share !== 'function') {
      return false
    }

    return window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 1024
  }

  async function handleShare() {
    const shareUrl = resolveShareUrl(url)

    try {
      if (shouldUseNativeShare()) {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        })
        setFeedback('shared')
      } else {
        await navigator.clipboard.writeText(shareUrl)
        setFeedback('copied')
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return
      }

      try {
        await navigator.clipboard.writeText(shareUrl)
        setFeedback('copied')
      } catch {
        setFeedback('error')
      }
    }

    window.setTimeout(() => setFeedback('idle'), 2500)
  }

  const label =
    feedback === 'copied'
      ? 'Link copiado com sucesso'
      : feedback === 'shared'
        ? 'Compartilhado'
        : feedback === 'error'
          ? 'Nao foi possivel copiar'
          : 'Compartilhar'

  const compactLabel =
    feedback === 'copied'
      ? 'Link copiado'
      : feedback === 'shared'
        ? 'Compartilhado'
        : feedback === 'error'
          ? 'Falha ao copiar'
          : ''

  const isIconOnly = variant === 'icon'

  return (
    <div className={`relative inline-flex ${className || ''}`.trim()}>
      <button
        type="button"
        onClick={handleShare}
        aria-label={label}
        title="Compartilhar artigo"
        className={
          isIconOnly
            ? 'inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(26,58,82,0.12)] bg-white text-[#1A3A52] transition-colors hover:border-[#C9A962] hover:text-[#C9A962]'
            : 'inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(26,58,82,0.12)] bg-white px-4 py-3 text-sm font-semibold text-[#1A3A52] transition-colors hover:border-[#C9A962] hover:text-[#C9A962]'
        }
      >
        {feedback === 'copied' || feedback === 'shared' ? (
          <Check className="w-4 h-4" />
        ) : (
          <Share2 className="w-4 h-4" />
        )}
        {isIconOnly ? null : <span>{label}</span>}
      </button>

      {isIconOnly ? (
        <span
          className={`pointer-events-none absolute bottom-full right-0 z-10 mb-3 rounded-lg bg-[#1A3A52] px-2.5 py-1 text-center text-xs font-semibold whitespace-nowrap text-white shadow-lg transition-all ${
            feedback === 'idle'
              ? 'invisible translate-y-1 opacity-0'
              : 'visible translate-y-0 opacity-100'
          }`}
        >
          {compactLabel}
        </span>
      ) : null}
    </div>
  )
}
