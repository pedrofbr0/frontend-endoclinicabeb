import {PortableText} from '@portabletext/react'
import type {ReactNode} from 'react'
import {getYouTubeEmbedUrl, urlFor} from '../../lib/sanity'

interface PortableTextContentProps {
  value: any[]
}

function resolveTextAlignment(value?: any) {
  if (value?.textAlignment) {
    return value.textAlignment
  }

  if (value?.style === 'alignLeft') return 'left'
  if (value?.style === 'alignCenter') return 'center'
  if (value?.style === 'alignRight') return 'right'

  return 'justify'
}

function getAlignmentClassName(value?: any) {
  const textAlignment = resolveTextAlignment(value)

  if (textAlignment === 'left') return 'text-left'
  if (textAlignment === 'center') return 'text-center'
  if (textAlignment === 'right') return 'text-right'

  return '[text-align:justify]'
}

const portableTextComponents = {
  types: {
    image: ({value}: {value: any}) => {
      if (!value?.asset?._ref) return null

      return (
        <img
          alt={value.alt || 'Imagem do artigo'}
          loading="lazy"
          src={urlFor(value).auto('format').width(1400).url()}
          className="rounded-xl shadow-md my-10 mx-auto max-h-[500px] object-cover"
        />
      )
    },
    youtubeEmbed: ({value}: {value: any}) => {
      const embedUrl = getYouTubeEmbedUrl(value?.url)

      if (!embedUrl) return null

      return (
        <div className="my-10 overflow-hidden rounded-2xl shadow-lg bg-[#FAFAF8] border border-[rgba(26,58,82,0.08)]">
          <div className="aspect-video">
            <iframe
              src={embedUrl}
              title={value?.titulo || 'Video do YouTube'}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )
    },
  },
  block: {
    normal: ({children, value}: {children?: ReactNode; value?: any}) => (
      <p
        className={`mb-7 text-[1.08rem] leading-[1.95] text-[#4B5563] md:text-[1.16rem] ${getAlignmentClassName(value)}`}
      >
        {children}
      </p>
    ),
    justified: ({children, value}: {children?: ReactNode; value?: any}) => (
      <p
        className={`mb-7 text-[1.08rem] leading-[1.95] text-[#4B5563] md:text-[1.16rem] ${getAlignmentClassName(
          value,
        )}`}
      >
        {children}
      </p>
    ),
    alignLeft: ({children}: {children?: ReactNode}) => (
      <p className="mb-7 text-[1.08rem] leading-[1.9] text-left text-[#4B5563] md:text-[1.16rem]">
        {children}
      </p>
    ),
    alignCenter: ({children}: {children?: ReactNode}) => (
      <p className="mb-7 text-[1.08rem] leading-[1.9] text-center text-[#4B5563] md:text-[1.16rem]">
        {children}
      </p>
    ),
    alignRight: ({children}: {children?: ReactNode}) => (
      <p className="mb-7 text-[1.08rem] leading-[1.9] text-right text-[#4B5563] md:text-[1.16rem]">
        {children}
      </p>
    ),
    lead: ({children, value}: {children?: ReactNode; value?: any}) => (
      <p
        className={`mb-8 text-[1.2rem] leading-[1.85] text-[#35526B] font-medium md:text-[1.35rem] ${getAlignmentClassName(value)}`}
      >
        {children}
      </p>
    ),
    h1: ({children, value}: {children?: ReactNode; value?: any}) => (
      <h1
        className={`text-4xl font-serif font-bold text-[#1A3A52] mb-6 mt-12 ${getAlignmentClassName(value)}`}
      >
        {children}
      </h1>
    ),
    h2: ({children, value}: {children?: ReactNode; value?: any}) => (
      <h2
        className={`text-3xl font-serif font-bold text-[#1A3A52] mb-6 mt-14 ${getAlignmentClassName(value)}`}
      >
        {children}
      </h2>
    ),
    h3: ({children, value}: {children?: ReactNode; value?: any}) => (
      <h3
        className={`text-2xl font-serif font-bold text-[#1A3A52] mb-4 mt-10 ${getAlignmentClassName(value)}`}
      >
        {children}
      </h3>
    ),
    blockquote: ({children, value}: {children?: ReactNode; value?: any}) => (
      <blockquote
        className={`border-l-4 border-[#C9A962] pl-6 py-2 italic text-xl leading-[1.8] text-[#6B7280] my-10 bg-[#FAFAF8] ${getAlignmentClassName(
          value,
        )}`}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}: {children?: ReactNode}) => (
      <ul className="list-disc pl-8 mb-6 text-[1.08rem] leading-[1.85] text-[#4B5563] space-y-2">
        {children}
      </ul>
    ),
    number: ({children}: {children?: ReactNode}) => (
      <ol className="list-decimal pl-8 mb-6 text-[1.08rem] leading-[1.85] text-[#4B5563] space-y-2">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({children}: {children?: ReactNode}) => (
      <strong className="font-bold text-[#1A3A52]">{children}</strong>
    ),
    em: ({children}: {children?: ReactNode}) => (
      <em className="italic text-[#35526B]">{children}</em>
    ),
    link: ({children, value}: {children?: ReactNode; value?: {href?: string}}) => {
      const href = value?.href || '#'
      const rel = href.startsWith('/') ? undefined : 'noreferrer noopener'
      const target = href.startsWith('/') ? undefined : '_blank'

      return (
        <a
          href={href}
          rel={rel}
          target={target}
          className="text-[#C9A962] font-semibold underline hover:text-[#1A3A52] transition-colors"
        >
          {children}
        </a>
      )
    },
  },
}

export function PortableTextContent({value}: PortableTextContentProps) {
  return <PortableText value={value} components={portableTextComponents} />
}
