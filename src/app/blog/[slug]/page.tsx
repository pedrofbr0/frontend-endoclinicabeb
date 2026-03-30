import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {PortableTextContent} from '../../components/PortableTextContent'
import {ShareArticleButton} from '../../components/ShareArticleButton'
import {buildAbsoluteUrl, formatBrazilianDate, truncateText} from '../../../lib/sanity'
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

  return {
    title: post.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url: canonicalUrl,
      authors: [post.author],
      publishedTime: post.publishedAt,
      images: post.coverImageUrl
        ? [
            {
              url: post.coverImageUrl,
              alt: post.title,
            },
          ]
        : ['/logo-beb.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.coverImageUrl ? [post.coverImageUrl] : ['/logo-beb.png'],
    },
  }
}

export default async function BlogPostPage({params}: BlogPostPageProps) {
  const {slug} = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/blog"
          className="inline-flex items-center text-[#C9A962] font-semibold hover:text-[#1A3A52] transition-colors mb-8"
        >
          &larr; Voltar para o blog
        </Link>

        {post.coverImageUrl ? (
          <div className="w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden mb-12 shadow-lg">
            <img src={post.coverImageUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>
        ) : null}

        <header className="mb-12 pb-8 border-b border-gray-100 max-w-3xl mx-auto">
          <h1 className="mb-6 text-4xl font-serif font-bold leading-tight text-[#1A3A52] md:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium tracking-wide text-[#6B7280] uppercase">
              <span>{formatBrazilianDate(post.publishedAt)}</span>
              <span className="text-[#C9A962]">.</span>
              <span>Por {post.author}</span>
            </div>

            <ShareArticleButton
              title={post.title}
              text={post.excerpt}
              url={`/blog/${post.slug}`}
              className="md:self-end"
            />
          </div>
        </header>

        <div className="prose-custom max-w-3xl mx-auto">
          <PortableTextContent value={post.content} />
        </div>
      </div>
    </article>
  )
}
