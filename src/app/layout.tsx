import type {Metadata} from 'next'
import type {ReactNode} from 'react'
import {GoogleTagManager} from '@next/third-parties/google'
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
      width: 64,
      height: 64,
      fit: 'max',
      format: 'png',
    }) || '/favicon.png'
  const socialImage =
    getSanityImageUrl(siteSettings.heroImage, {
      width: 1200,
      height: 630,
      fit: 'crop',
    }) ||
    getSanityImageUrl(siteSettings.logo, {
      width: 1200,
      height: 630,
      fit: 'max',
    }) ||
    '/logo-beb.png'

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
    verification: {
      google: 'Fh45CElT353VdDEbTmpra9w33LF7tp8OTdnnuENEoTQ',
    },
    other: {
      'google-adsense-account': 'ca-pub-8890711182070821',
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
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'EndoClínica B&B',
    alternateName: [
      'EndoClinica B&B',
      'EndoClínica BeB',
      'EndoClinica BeB',
      'Clínica de Endocrinologia B&B',
      'Clinica de Endocrinologia B&B',
      'Clínica de Endocrinologia BeB',
      'Clinica de Endocrinologia BeB',
      'Clínica de Endocrinologia',
      'Clínica B&B',
      'Clinica B&B',
      'Clínica BeB',
      'Clinica BeB',
    ],
    url: getSiteUrl(),
    description:
      'Clínica de endocrinologia com foco em emagrecimento, diabetes, reposição hormonal, tireoide e metabolismo ósseo.',
    inLanguage: 'pt-BR',
    ...(logoUrl ? {logo: logoUrl} : {}),
    ...(contactInfo?.phone
      ? {
          telephone: contactInfo.phone,
          contactPoint: [
            {
              '@type': 'ContactPoint',
              contactType: 'customer service',
              telephone: contactInfo.phone,
            },
          ],
        }
      : {}),
    ...(contactInfo?.email ? {email: contactInfo.email} : {}),
    ...(contactInfo?.city
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: [contactInfo?.street, contactInfo?.number]
              .filter(Boolean)
              .join(', '),
            ...(contactInfo?.city ? {addressLocality: contactInfo.city} : {}),
            ...(contactInfo?.state ? {addressRegion: contactInfo.state} : {}),
            ...(contactInfo?.zipCode ? {postalCode: contactInfo.zipCode} : {}),
            addressCountry: 'BR',
          },
        }
      : {}),
    sameAs: [contactInfo?.instagram, contactInfo?.facebook, contactInfo?.linkedin].filter(Boolean),
    member: doctorProfiles.map((doctor) => ({
      '@type': 'Physician',
      name: doctor.name,
      ...(doctor.specialty ? {medicalSpecialty: doctor.specialty} : {}),
      ...(doctor.licenseNumber
        ? {identifier: {
            '@type': 'PropertyValue',
            name: 'CRM',
            value: doctor.licenseNumber,
          }}
        : {}),
    })),
  }

  return (
    <html lang="pt-BR">
      <body>
        <GoogleTagManager gtmId="GTM-MLCVGCRD" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(organizationSchema)}}
        />
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
