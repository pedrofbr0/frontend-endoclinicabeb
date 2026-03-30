import Link from 'next/link'
import {formatBrazilianDate, type BlogPostSummary} from '../../lib/sanity'
import {ShareArticleButton} from './ShareArticleButton'

interface BlogPreviewProps {
  posts: BlogPostSummary[]
}

export function BlogPreview({posts}: BlogPreviewProps) {
  if (!posts.length) {
    return null
  }

  return (
    <section id="blog" className="py-20 md:py-28 bg-[#FAFAF8]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#C9A962] text-sm font-semibold tracking-wider uppercase mb-4 block">
            Nosso Blog
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1A3A52] mb-6">
            Artigos Recentes
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            Informacoes e dicas sobre saude, metabolismo e bem-estar escritas pelos nossos
            especialistas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[rgba(26,58,82,0.08)] hover:shadow-lg transition-all flex flex-col group"
            >
              {post.coverImageUrl ? (
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="h-48 bg-[#1A3A52]/5 flex items-center justify-center">
                  <span className="text-[#C9A962] font-serif italic opacity-50 text-xl">
                    EndoClinica B&B
                  </span>
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                  <p className="text-sm text-[#C9A962] font-semibold mb-3 tracking-wide">
                    {formatBrazilianDate(post.publishedAt)} . {post.author}
                  </p>
                  <h3 className="text-xl font-bold text-[#1A3A52] mb-4 line-clamp-2">
                    {post.title}
                  </h3>
                  {post.excerpt ? (
                    <p className="text-[#6B7280] leading-relaxed line-clamp-3">{post.excerpt}</p>
                  ) : null}
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
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
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-block bg-[#1A3A52] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1A3A52]/90 transition-colors"
          >
            Ver todos os artigos
          </Link>
        </div>
      </div>
    </section>
  )
}
