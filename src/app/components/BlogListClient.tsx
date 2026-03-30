'use client'

import Link from 'next/link'
import {Search} from 'lucide-react'
import {useDeferredValue, useState} from 'react'
import {formatBrazilianDate, type BlogPostSummary} from '../../lib/sanity'
import {ShareArticleButton} from './ShareArticleButton'

interface BlogListClientProps {
  posts: BlogPostSummary[]
}

export function BlogListClient({posts}: BlogListClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const deferredSearchTerm = useDeferredValue(searchTerm.trim().toLowerCase())

  const filteredPosts = posts.filter((post) => {
    if (!deferredSearchTerm) {
      return true
    }

    const searchableContent = [post.title, post.author, post.excerpt].join(' ').toLowerCase()
    return searchableContent.includes(deferredSearchTerm)
  })

  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#FAFAF8]">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <Link
            href="/"
            className="mb-8 inline-flex items-center text-[#C9A962] font-semibold transition-colors hover:text-[#1A3A52]"
          >
            &larr; Voltar para o inicio
          </Link>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A3A52] mb-6">
              Blog da EndoClinica
            </h1>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto mb-10">
              Explore nossos artigos sobre endocrinologia, qualidade de vida e tratamentos.
            </p>

            {posts.length ? (
              <div className="max-w-xl mx-auto relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Pesquisar por titulo, assunto ou medico..."
                  className="w-full pl-11 pr-4 py-4 rounded-xl border border-gray-200 focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 outline-none transition-all shadow-sm"
                />
              </div>
            ) : null}
          </div>
        </div>

        {!posts.length ? (
          <div className="text-center py-20">
            <p className="text-xl text-[#6B7280]">
              Nenhum artigo publicado ainda. Assim que novos textos forem ao ar, eles aparecerao
              aqui.
            </p>
          </div>
        ) : null}

        {posts.length && !filteredPosts.length ? (
          <div className="text-center py-20">
            <p className="text-xl text-[#6B7280]">Nenhum artigo encontrado para "{searchTerm}".</p>
          </div>
        ) : null}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[rgba(26,58,82,0.08)] hover:shadow-lg transition-all flex flex-col h-full group"
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

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex-1">
                  <p className="text-sm text-[#C9A962] font-semibold mb-3 tracking-wide">
                    {formatBrazilianDate(post.publishedAt)} . {post.author}
                  </p>
                  <h2 className="text-2xl font-serif font-bold text-[#1A3A52] mb-4">
                    {post.title}
                  </h2>
                  {post.excerpt ? (
                    <p className="text-[#6B7280] leading-relaxed line-clamp-4">{post.excerpt}</p>
                  ) : null}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
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
      </div>
    </div>
  )
}
