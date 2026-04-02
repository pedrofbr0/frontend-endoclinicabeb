import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {PortableTextContent} from '../../components/PortableTextContent'
import {ShareArticleButton} from '../../components/ShareArticleButton'
import {ScrollToTopButton} from '../../components/ScrollToTopButton'
import {
  buildAbsoluteUrl,
  formatBrazilianDate,
  getSanityImageUrl,
  hasSanityImageAsset,
  truncateText,
} from '../../../lib/sanity'
import {getPostBySlug} from '../../../lib/sanity.server'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 60

export async function generateMetadata({params}: BlogPostPageProps): Promise<Metadata> {
  const {slug} = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Artigo nao encontrado',
    }
  }

  const description = truncateText(post.excerpt || post.title, 160)
  const canonicalUrl = buildAbsoluteUrl(`/blog/${post.slug}`)
  const socialImageUrl = getSanityImageUrl(post.coverImage, {width: 1200, height: 630})
  const shouldShowAuthor = post.showAuthor && Boolean(post.author)
  const shouldShowDate = post.showDate
  const openGraphData = {
    type: 'article',
    title: post.title,
    description,
    url: canonicalUrl,
    ...(shouldShowAuthor && post.author ? {authors: [post.author]} : {}),
    ...(shouldShowDate ? {publishedTime: post.publishedAt} : {}),
    images: socialImageUrl
      ? [
          {
            url: socialImageUrl,
            alt: post.title,
          },
        ]
      : ['/logo-beb.png'],
  }

  return {
    title: post.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: openGraphData,
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: socialImageUrl ? [socialImageUrl] : ['/logo-beb.png'],
    },
  }
}

export default async function BlogPostPage({params}: BlogPostPageProps) {
  const {slug} = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const metaParts = [
    post.showDate ? formatBrazilianDate(post.publishedAt) : '',
    post.showAuthor && post.author ? `Por ${post.author}` : '',
  ].filter(Boolean)
  const description = truncateText(post.excerpt || post.title, 160)
  const canonicalUrl = buildAbsoluteUrl(`/blog/${post.slug}`)
  const socialImageUrl = getSanityImageUrl(post.coverImage, {width: 1200, height: 630})
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description,
    mainEntityOfPage: canonicalUrl,
    ...(post.showDate ? {datePublished: post.publishedAt} : {}),
    ...(post.showAuthor && post.author
      ? {author: {'@type': 'Person', name: post.author}}
      : {}),
    ...(socialImageUrl ? {image: [socialImageUrl]} : {}),
  }

  return (
    <article className="pt-32 pb-24 min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(articleSchema)}}
      />
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/blog"
          className="inline-flex items-center text-[#C9A962] font-semibold hover:text-[#1A3A52] transition-colors mb-8"
        >
          &larr; Voltar para o blog
        </Link>

        {hasSanityImageAsset(post.coverImage) ? (
          <div className="w-full rounded-2xl overflow-hidden mb-12 shadow-lg bg-[#FAFAF8] border border-[rgba(26,58,82,0.08)]">
            <Image
              src={getSanityImageUrl(post.coverImage, {width: 1600})}
              alt={post.title}
              width={1600}
              height={900}
              className="w-full h-auto max-h-[560px] object-contain"
            />
          </div>
        ) : null}

        <header className="mb-12 pb-8 border-b border-gray-100 max-w-3xl mx-auto">
          <h1 className="mb-6 text-4xl font-serif font-bold leading-tight text-[#1A3A52] md:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            {metaParts.length ? (
              <div className="flex flex-wrap items-center gap-3 text-sm font-medium tracking-wide text-[#6B7280] uppercase">
                {metaParts.map((part, index) => (
                  <div key={`${part}-${index}`} className="flex items-center gap-3">
                    {index > 0 ? <span className="text-[#C9A962]">{'\u2022'}</span> : null}
                    <span>{part}</span>
                  </div>
                ))}
              </div>
            ) : <div />}

            <ShareArticleButton
              title={post.title}
              text={post.excerpt}
              url={`/blog/${post.slug}`}
              className="md:self-end"
            />
          </div>
        </header>

        <div className="prose-custom max-w-[780px] mx-auto">
          <PortableTextContent value={post.content} />
        </div>

        <div className="mx-auto mt-16 flex max-w-[780px] flex-col items-center justify-center gap-4 border-t border-[rgba(26,58,82,0.08)] pt-8 sm:flex-row sm:justify-between">
          <Link
            href="/blog"
            className="inline-flex min-h-[46px] items-center justify-center rounded-xl bg-[#1A3A52] px-5 py-3 font-semibold text-white transition-all hover:bg-[#102636] hover:shadow-md"
          >
            &larr; Voltar para o blog
          </Link>

          <ScrollToTopButton />
        </div>
      </div>
    </article>
  )
}
