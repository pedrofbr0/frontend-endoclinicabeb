import Link from 'next/link'
import {
  formatBrazilianDate,
  getSanityImageUrl,
  hasSanityImageAsset,
  type BlogPostSummary,
} from '../../lib/sanity'
import {ShareArticleButton} from './ShareArticleButton'

interface BlogPostCardProps {
  post: BlogPostSummary
  variant?: 'home' | 'listing'
}

export function BlogPostCard({post, variant = 'listing'}: BlogPostCardProps) {
  const isHomeVariant = variant === 'home'
  const cardImageUrl = getSanityImageUrl(post.cardImage, {
    width: 960,
    height: 540,
    fit: 'crop',
  })

  return (
    <article
      className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-[rgba(26,58,82,0.08)] hover:shadow-lg transition-all flex flex-col group ${
        isHomeVariant ? '' : 'h-full'
      }`.trim()}
    >
      {hasSanityImageAsset(post.cardImage) ? (
        <div className="aspect-video overflow-hidden bg-[#F5F3EE]">
          <img
            src={cardImageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="aspect-video bg-[#1A3A52]/5 flex items-center justify-center">
          <span className="text-[#C9A962] font-serif italic opacity-50 text-xl">EndoClinica B&B</span>
        </div>
      )}

      <div className={`${isHomeVariant ? 'p-6' : 'p-8'} flex-1 flex flex-col`.trim()}>
        <div className="flex-1">
          <p className="text-sm text-[#C9A962] font-semibold mb-3 tracking-wide">
            {formatBrazilianDate(post.publishedAt)} . {post.author}
          </p>
          <h3
            className={`text-[#1A3A52] mb-4 ${
              isHomeVariant ? 'text-xl font-bold line-clamp-2' : 'text-2xl font-serif font-bold'
            }`.trim()}
          >
            {post.title}
          </h3>
          {post.excerpt ? (
            <p
              className={`text-[#6B7280] leading-relaxed ${
                isHomeVariant ? 'line-clamp-3' : 'line-clamp-4'
              }`.trim()}
            >
              {post.excerpt}
            </p>
          ) : null}
        </div>

        <div
          className={`border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 ${
            isHomeVariant ? 'mt-4 pt-4' : 'mt-8 pt-6'
          }`.trim()}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-[#1A3A52] font-semibold hover:text-[#C9A962] transition-colors"
          >
            Ler artigo completo &rarr;
          </Link>
          <ShareArticleButton
            title={post.title}
            text={post.excerpt}
            url={`/blog/${post.slug}`}
            variant="icon"
          />
        </div>
      </div>
    </article>
  )
}
