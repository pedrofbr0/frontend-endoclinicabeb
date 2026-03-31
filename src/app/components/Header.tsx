'use client'

import Link from 'next/link'
import {Mail, Menu, Phone, X} from 'lucide-react'
import {useState} from 'react'
import type {ContactInfo} from '../../lib/sanity'
import {SectionNavLink} from './SectionNavLink'

interface HeaderProps {
  contactInfo: ContactInfo | null
  hasBlogPosts: boolean
  logoUrl?: string
}

const quickMessage = 'Ola! Gostaria de agendar uma avaliacao personalizada.'

export function Header({contactInfo, hasBlogPosts, logoUrl}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const whatsappNumber = contactInfo?.phone?.replace(/\D/g, '') || ''

  const navLinks = [
    {sectionId: 'diferenciais' as const, label: 'Diferenciais'},
    {sectionId: 'especialidades' as const, label: 'Especialidades'},
    {sectionId: 'equipe' as const, label: 'Equipe'},
  ]

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#FAFAF8]/95 backdrop-blur-md shadow-sm z-50 border-b border-[rgba(26,58,82,0.08)]">
      <div className="bg-[#1A3A52] text-white py-2.5 min-h-[40px]">
        <div className="container mx-auto px-4 flex justify-end gap-6 text-sm">
          {whatsappNumber ? (
            <a
              href={`https://wa.me/55${whatsappNumber}?text=${encodeURIComponent(quickMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#C9A962] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{contactInfo?.phone}</span>
            </a>
          ) : null}

          {contactInfo?.email ? (
            <a
              href={`mailto:${contactInfo.email}`}
              className="hidden md:flex items-center gap-2 hover:text-[#C9A962] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{contactInfo.email}</span>
            </a>
          ) : null}
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="cursor-pointer text-left flex items-center gap-3">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo da EndoClinica B&B"
                className="h-6 md:h-8 w-auto object-contain"
              />
            ) : null}

            <span className="text-2xl md:text-3xl font-serif font-bold">
              <span className="text-[#C9A962]">Endo</span>
              <span className="text-[#1A3A52]">Clínica</span>{' '}
              <span className="text-[#C9A962]">B&B</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <SectionNavLink
              sectionId="home"
              className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-[15px] font-medium"
            >
              Inicio
            </SectionNavLink>

            {navLinks.map((navLink) => (
              <SectionNavLink
                key={navLink.sectionId}
                sectionId={navLink.sectionId}
                className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-[15px] font-medium"
              >
                {navLink.label}
              </SectionNavLink>
            ))}

            {hasBlogPosts ? (
              <SectionNavLink
                sectionId="blog"
                className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-[15px] font-medium"
              >
                Artigos Recentes
              </SectionNavLink>
            ) : null}

            {hasBlogPosts ? (
              <Link
                href="/blog"
                className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-[15px] font-medium"
              >
                Blog
              </Link>
            ) : null}

            <SectionNavLink
              sectionId="contato"
              className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-[15px] font-medium"
            >
              Contato
            </SectionNavLink>

            <SectionNavLink
              sectionId="contato"
              className="bg-[#C9A962] text-[#1A3A52] px-6 py-2.5 rounded-xl hover:bg-[#A08847] transition-all shadow-md hover:shadow-lg font-semibold min-h-[44px] inline-flex items-center"
            >
              Agendar Avaliacao
            </SectionNavLink>
          </nav>

          <button
            className="lg:hidden text-[#1A3A52] p-2"
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen ? (
          <nav className="lg:hidden mt-6 pb-4 flex flex-col gap-4 border-t border-[rgba(26,58,82,0.08)] pt-4">
            <SectionNavLink
              sectionId="home"
              onNavigate={() => setIsMenuOpen(false)}
              className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-left font-medium"
            >
              Inicio
            </SectionNavLink>

            {navLinks.map((navLink) => (
              <SectionNavLink
                key={navLink.sectionId}
                sectionId={navLink.sectionId}
                onNavigate={() => setIsMenuOpen(false)}
                className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-left font-medium"
              >
                {navLink.label}
              </SectionNavLink>
            ))}

            {hasBlogPosts ? (
              <SectionNavLink
                sectionId="blog"
                onNavigate={() => setIsMenuOpen(false)}
                className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-left font-medium"
              >
                Artigos Recentes
              </SectionNavLink>
            ) : null}

            {hasBlogPosts ? (
              <Link
                href="/blog"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-left font-medium"
              >
                Blog
              </Link>
            ) : null}

            <SectionNavLink
              sectionId="contato"
              onNavigate={() => setIsMenuOpen(false)}
              className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-left font-medium"
            >
              Contato
            </SectionNavLink>

            <SectionNavLink
              sectionId="contato"
              onNavigate={() => setIsMenuOpen(false)}
              className="bg-[#C9A962] text-[#1A3A52] px-6 py-3 rounded-xl hover:bg-[#A08847] transition-all text-center font-semibold min-h-[44px]"
            >
              Agendar Avaliação
            </SectionNavLink>
          </nav>
        ) : null}
      </div>
    </header>
  )
}
