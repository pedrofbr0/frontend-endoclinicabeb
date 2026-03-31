import type {Metadata} from 'next'
import type {ReactNode} from 'react'
import '../styles/index.css'
import {Footer} from './components/Footer'
import {FloatingWhatsApp} from './components/FloatingWhatsApp'
import {Header} from './components/Header'
import {getDoctorProfiles, getSiteSettings, getSiteShellData} from '../lib/sanity.server'
import {getSanityImageUrl, getSiteUrl} from '../lib/sanity'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = (await getSiteSettings()) || {}
  const faviconUrl =
    getSanityImageUrl(siteSettings.favicon, {
      width: 128,
      height: 128,
      fit: 'max',
    }) || '/favicon-blue-background.png'
  const socialImage =
    getSanityImageUrl(siteSettings.logo, {
      width: 1200,
      height: 630,
      fit: 'max',
    }) || '/logo-beb.png'

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: 'EndoClínica B&B',
      template: '%s | EndoClínica B&B',
    },
    description:
      'Landing page da EndoClínica B&B com informações sobre a clínica, equipe médica e artigos de endocrinologia.',
    icons: {
      icon: [{url: faviconUrl}],
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      siteName: 'EndoClínica B&B',
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
  const logoUrl = getSanityImageUrl(siteSettings.logo, {
    width: 160,
    height: 160,
    fit: 'max',
  })

  return (
    <html lang="pt-BR">
      <body>
        <div className="min-h-screen bg-[#FAFAF8]">
          <Header
            contactInfo={contactInfo}
            hasBlogPosts={hasBlogPosts}
            logoUrl={logoUrl}
          />
          {children}
          <Footer
            contactInfo={contactInfo}
            doctorProfiles={doctorProfiles}
            hasBlogPosts={hasBlogPosts}
            logoUrl={logoUrl}
          />
          <FloatingWhatsApp phone={contactInfo?.phone} />
        </div>
      </body>
    </html>
  )
}
