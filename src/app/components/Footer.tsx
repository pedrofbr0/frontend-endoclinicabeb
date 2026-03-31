import Link from 'next/link'
import {Heart, MapPin, Phone} from 'lucide-react'
import type {ContactInfo, DoctorProfile} from '../../lib/sanity'
import {SectionNavLink} from './SectionNavLink'

interface FooterProps {
  contactInfo: ContactInfo | null
  doctorProfiles: DoctorProfile[]
  hasBlogPosts: boolean
  logoUrl?: string
}

const quickMessage = 'Ola! Gostaria de agendar uma avaliacao personalizada.'

export function Footer({contactInfo, doctorProfiles, hasBlogPosts, logoUrl}: FooterProps) {
  const currentYear = new Date().getFullYear()
  const phoneNumber = contactInfo?.phone?.replace(/\D/g, '') || ''
  const addressLine = [contactInfo?.street, contactInfo?.number].filter(Boolean).join(', ')
  const regionLine = [contactInfo?.neighborhood, contactInfo?.city, contactInfo?.state]
    .filter(Boolean)
    .join(' - ')

  return (
    <footer className="bg-[#1A3A52] text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              {logoUrl ? (
                <div className="h-8 w-8 md:h-10 md:w-10 flex items-center justify-center shrink-0">
                  <img
                    src={logoUrl}
                    alt="Logo da clinica"
                    className="h-full w-full object-contain invert brightness-0"
                  />
                </div>
              ) : null}
              <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold leading-none whitespace-nowrap">
                <span className="text-[#C9A962]">Endo</span>
                <span className="text-white">Clínica</span>{' '}
                <span className="text-[#C9A962]">B&B</span>
              </h3>
            </div>

            <p className="text-white/80 leading-relaxed mb-6">
              Endocrinologia de alto padrão, unindo ciência, tecnologia e atendimento humanizado.
            </p>

            {addressLine || regionLine ? (
              <div className="flex items-start gap-2 text-white/80">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-[#C9A962]" />
                <address className="not-italic text-sm leading-relaxed">
                  {addressLine ? (
                    <>
                      {addressLine}
                      <br />
                    </>
                  ) : null}
                  {contactInfo?.complement ? (
                    <>
                      {contactInfo.complement}
                      <br />
                    </>
                  ) : null}
                  {regionLine ? (
                    <>
                      {regionLine}
                      <br />
                    </>
                  ) : null}
                  {contactInfo?.zipCode ? <>CEP: {contactInfo.zipCode}</> : null}
                </address>
              </div>
            ) : null}
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Navegação</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <SectionNavLink
                  sectionId="home"
                  className="hover:text-[#C9A962] transition-colors text-sm"
                >
                  Inicio
                </SectionNavLink>
              </li>
              <li>
                <SectionNavLink
                  sectionId="diferenciais"
                  className="hover:text-[#C9A962] transition-colors text-sm"
                >
                  Diferenciais
                </SectionNavLink>
              </li>
              <li>
                <SectionNavLink
                  sectionId="especialidades"
                  className="hover:text-[#C9A962] transition-colors text-sm"
                >
                  Especialidades
                </SectionNavLink>
              </li>
              <li>
                <SectionNavLink
                  sectionId="equipe"
                  className="hover:text-[#C9A962] transition-colors text-sm"
                >
                  Equipe
                </SectionNavLink>
              </li>
              {hasBlogPosts ? (
                <li>
                  <SectionNavLink
                    sectionId="blog"
                    className="hover:text-[#C9A962] transition-colors text-sm"
                  >
                    Artigos Recentes
                  </SectionNavLink>
                </li>
              ) : null}
              <li>
                <SectionNavLink
                  sectionId="contato"
                  className="hover:text-[#C9A962] transition-colors text-sm"
                >
                  Contato
                </SectionNavLink>
              </li>
              {hasBlogPosts ? (
                <li>
                  <Link href="/blog" className="hover:text-[#C9A962] transition-colors text-sm">
                    Blog
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Especialidades</h4>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>Emagrecimento</li>
              <li>Diabetes</li>
              <li>Reposição Hormonal</li>
              <li>Tireoide</li>
              <li>Endocrinologia Esportiva</li>
              <li>Metabolismo Ósseo</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Contato</h4>

            {phoneNumber ? (
              <ul className="space-y-3 text-white/80 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C9A962]" />
                  <a
                    href={`https://wa.me/55${phoneNumber}?text=${encodeURIComponent(quickMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C9A962] transition-colors"
                  >
                    {contactInfo?.phone}
                  </a>
                </li>
              </ul>
            ) : null}

            {contactInfo?.businessHours?.length ? (
              <div className="mt-6">
                <h5 className="font-semibold text-sm mb-3">Horários de Atendimento</h5>
                <p className="text-white/80 text-sm leading-relaxed">
                  {contactInfo.businessHours.map((businessHour) => (
                    <span key={businessHour._key} className="block">
                      {businessHour.day}: {businessHour.hours}
                    </span>
                  ))}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
              &copy; {currentYear} EndoClinica B&B. Todos os direitos reservados.
            </p>
            <p className="text-white/70 text-sm flex items-center gap-2">
              Feito com <Heart className="w-4 h-4 fill-[#C9A962] text-[#C9A962]" /> para nossos
              pacientes
            </p>
          </div>
          <div className="mt-4 text-center md:text-left">
            <p className="text-white/60 text-xs">
              {doctorProfiles.length
                ? doctorProfiles.map((doctorProfile) => `${doctorProfile.name} - ${doctorProfile.licenseNumber}`).join(' | ')
                : 'Medicos especialistas'}
            </p>
            <p className="text-white/60 text-xs mt-1">
              Especialistas em endocrinologia e metabologia
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
