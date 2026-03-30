import type {Metadata} from 'next'
import type {ReactNode} from 'react'
import '../styles/index.css'
import {Footer} from './components/Footer'
import {FloatingWhatsApp} from './components/FloatingWhatsApp'
import {Header} from './components/Header'
import {getDoctorProfiles, getSiteSettings, getSiteShellData} from '../lib/sanity.server'
import {getSiteUrl} from '../lib/sanity'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = (await getSiteSettings()) || {}
  const faviconUrl = siteSettings.faviconUrl || '/favicon-blue-background.png'
  const socialImage = siteSettings.logoUrl || '/logo-beb.png'

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: 'EndoClinica B&B',
      template: '%s | EndoClinica B&B',
    },
    description:
      'Landing page da EndoClinica B&B com informacoes sobre a clinica, equipe medica e artigos de endocrinologia.',
    icons: {
      icon: [{url: faviconUrl}],
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      siteName: 'EndoClinica B&B',
      images: [socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      images: [socialImage],
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const [{contactInfo, siteSettings, hasBlogPosts}, doctorProfiles] = await Promise.all([
    getSiteShellData(),
    getDoctorProfiles(),
  ])

  return (
    <html lang="pt-BR">
      <body>
        <div className="min-h-screen bg-[#FAFAF8]">
          <Header
            contactInfo={contactInfo}
            hasBlogPosts={hasBlogPosts}
            logoUrl={siteSettings.logoUrl}
          />
          {children}
          <Footer
            contactInfo={contactInfo}
            doctorProfiles={doctorProfiles}
            hasBlogPosts={hasBlogPosts}
            logoUrl={siteSettings.logoUrl}
          />
          <FloatingWhatsApp phone={contactInfo?.phone} />
        </div>
      </body>
    </html>
  )
}
