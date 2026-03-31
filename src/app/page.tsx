import type {Metadata} from 'next'
import {BlogPreview} from './components/BlogPreview'
import {Contact} from './components/Contact'
import {HashScrollHandler} from './components/HashScrollHandler'
import {Hero} from './components/Hero'
import {Specialties} from './components/Specialties'
import {Team} from './components/Team'
import {ValueProposition} from './components/ValueProposition'
import {getDoctorProfiles, getLatestPosts, getSiteShellData} from '../lib/sanity.server'
import {getSanityImageUrl} from '../lib/sanity'

export const metadata: Metadata = {
  title: 'Endocrinologia de Alto Padrão',
  description:
    'Atendimento em endocrinologia com foco em emagrecimento, diabetes, reposição hormonal, tireoide e metabolismo ósseo.',
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

  return (
    <main>
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
