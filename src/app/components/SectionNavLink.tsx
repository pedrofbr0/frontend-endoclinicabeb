'use client'

import type {ReactNode, MouseEvent} from 'react'
import {usePathname, useRouter} from 'next/navigation'

interface SectionNavLinkProps {
  sectionId: 'home' | 'diferenciais' | 'especialidades' | 'equipe' | 'blog' | 'contato'
  children: ReactNode
  className?: string
  onNavigate?: () => void
}

function getSectionHref(sectionId: SectionNavLinkProps['sectionId']) {
  return sectionId === 'home' ? '/' : `/#${sectionId}`
}

export function SectionNavLink({
  sectionId,
  children,
  className,
  onNavigate,
}: SectionNavLinkProps) {
  const pathname = usePathname()
  const router = useRouter()
  const href = getSectionHref(sectionId)

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onNavigate?.()

    if (pathname !== '/') {
      event.preventDefault()
      router.push(href)
      return
    }

    if (sectionId === 'home') {
      event.preventDefault()
      window.history.replaceState(null, '', '/')
      window.scrollTo({top: 0, behavior: 'smooth'})
      return
    }

    const element = document.getElementById(sectionId)

    if (!element) {
      return
    }

    event.preventDefault()
    window.history.replaceState(null, '', href)
    element.scrollIntoView({behavior: 'smooth', block: 'start'})
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
