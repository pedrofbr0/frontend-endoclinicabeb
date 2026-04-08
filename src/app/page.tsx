import type {Metadata} from 'next'
import {BlogPreview} from './components/BlogPreview'
import {Contact} from './components/Contact'
import {HashScrollHandler} from './components/HashScrollHandler'
import {Hero} from './components/Hero'
import {Specialties} from './components/Specialties'
import {Team} from './components/Team'
import {ValueProposition} from './components/ValueProposition'
import {getDoctorProfiles, getLatestPosts, getSiteShellData} from '../lib/sanity.server'
import {buildAbsoluteUrl, getSanityImageUrl, getSiteUrl} from '../lib/sanity'

export const metadata: Metadata = {
  title: 'Endocrinologia de Alto Padrão',
  description:
    'EndoClínica B&B — atendimento em endocrinologia com foco em emagrecimento, diabetes, reposição hormonal, tireoide e metabolismo ósseo. Conheça nossa equipe médica especializada.',
  alternates: {
    canonical: buildAbsoluteUrl('/'),
  },
}

export default async function HomePage() {
  const [{contactInfo, siteSettings, hasBlogPosts}, doctorProfiles, latestPosts] = await Promise.all(
    [getSiteShellData(), getDoctorProfiles(), getLatestPosts(3)],
  )
  const heroImageUrl = getSanityImageUrl(siteSettings.heroImage, {
    width: 1200,
    height: 1500,
    fit: 'crop',
  })

  const physicianSchemas = doctorProfiles.map((doctor) => ({
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.name,
    ...(doctor.specialty ? {medicalSpecialty: doctor.specialty} : {}),
    ...(doctor.education ? {alumniOf: doctor.education} : {}),
    ...(doctor.licenseNumber
      ? {identifier: {
          '@type': 'PropertyValue',
          name: 'CRM',
          value: doctor.licenseNumber,
        }}
      : {}),
    worksFor: {
      '@type': 'MedicalBusiness',
      name: 'EndoClínica B&B',
      url: getSiteUrl(),
    },
  }))

  return (
    <main>
      {physicianSchemas.map((schema, index) => (
        <script
          key={`physician-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
        />
      ))}
      <HashScrollHandler />
      <Hero heroImageUrl={heroImageUrl} />
      <ValueProposition />
      <Specialties />
      <Team doctorProfiles={doctorProfiles} />
      {hasBlogPosts ? <BlogPreview posts={latestPosts} /> : null}
      <Contact contactInfo={contactInfo} />
    </main>
  )
}
