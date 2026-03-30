import {createClient} from '@sanity/client'
import {createImageUrlBuilder} from '@sanity/image-url'

export const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'olc9cotp'
export const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const SANITY_API_VERSION = '2024-03-24'

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: true,
  apiVersion: SANITY_API_VERSION,
})

const imageBuilder = createImageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return imageBuilder.image(source)
}

export interface BusinessHour {
  _key: string
  day: string
  hours: string
}

export interface ContactInfo {
  phone?: string
  email?: string
  street?: string
  number?: string
  neighborhood?: string
  city?: string
  state?: string
  zipCode?: string
  complement?: string
  instagram?: string
  facebook?: string
  linkedin?: string
  businessHours?: BusinessHour[]
}

export interface SiteConfigData {
  logoUrl?: string
  faviconUrl?: string
  heroImageUrl?: string
}

export interface DoctorProfile {
  name: string
  licenseNumber: string
  specialty: string
  education: string
  clinicalResidency?: string
  endocrinologyResidency?: string
  imageUrl?: string
}

export interface SanityPostRecord {
  _id: string
  title: string
  slug: string
  author: string
  _createdAt: string
  useRealDate?: boolean
  displayDate?: string
  coverImageUrl?: string
  excerpt?: string
  content?: any[]
}

export interface BlogPostSummary {
  _id: string
  title: string
  slug: string
  author: string
  publishedAt: string
  coverImageUrl?: string
  excerpt: string
}

export interface BlogPostDetail extends BlogPostSummary {
  content: any[]
}

export function truncateText(text: string, maxLength = 180) {
  const normalized = text.replace(/\s+/g, ' ').trim()

  if (normalized.length <= maxLength) {
    return normalized
  }

  return `${normalized.slice(0, maxLength).trimEnd()}...`
}

export function resolveDisplayDate(
  post: Pick<SanityPostRecord, '_createdAt' | 'useRealDate' | 'displayDate'>,
) {
  if (post.useRealDate === false && post.displayDate) {
    return post.displayDate
  }

  return post._createdAt
}

export function formatBrazilianDate(value: string) {
  if (!value) return ''

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-')
    return `${day}/${month}/${year}`
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(value))
}

export function mapBlogPost(post: SanityPostRecord): BlogPostSummary {
  return {
    _id: post._id,
    title: post.title,
    slug: post.slug,
    author: post.author,
    publishedAt: resolveDisplayDate(post),
    coverImageUrl: post.coverImageUrl,
    excerpt: truncateText(post.excerpt || ''),
  }
}

export function sortPostsByDisplayDate<T extends {publishedAt: string}>(posts: T[]) {
  return [...posts].sort((left, right) => {
    const leftDate = new Date(left.publishedAt).getTime()
    const rightDate = new Date(right.publishedAt).getTime()
    return rightDate - leftDate
  })
}

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL

  if (!configuredUrl) {
    return 'http://localhost:3000'
  }

  return configuredUrl.startsWith('http') ? configuredUrl : `https://${configuredUrl}`
}

export function buildAbsoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString()
}

export function getYouTubeVideoId(url?: string) {
  if (!url) return ''

  try {
    const parsedUrl = new URL(url)

    if (parsedUrl.hostname.includes('youtu.be')) {
      return parsedUrl.pathname.replace('/', '')
    }

    if (parsedUrl.hostname.includes('youtube.com')) {
      if (parsedUrl.pathname === '/watch') {
        return parsedUrl.searchParams.get('v') || ''
      }

      const segments = parsedUrl.pathname.split('/').filter(Boolean)
      return segments[segments.length - 1] || ''
    }
  } catch {
    return ''
  }

  return ''
}

export function getYouTubeEmbedUrl(url?: string) {
  const videoId = getYouTubeVideoId(url)
  return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : ''
}
