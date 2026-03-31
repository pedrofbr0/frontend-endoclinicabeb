import Link from 'next/link'
import type {BlogPostSummary} from '../../lib/sanity'
import {BlogPostCard} from './BlogPostCard'

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
            <BlogPostCard key={post._id} post={post} variant="home" />
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
