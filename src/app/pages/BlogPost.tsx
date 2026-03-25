import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../../lib/sanity';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';

// Construtor para transformar os blocos de imagem em URLs
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

export function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Trazemos tudo, incluindo a URL da capa
    const query = `*[_type == "post" && slug.current == "${slug}"][0]{
      ...,
      "imagemCapaUrl": imagemCapa.asset->url
    }`;
    
    client.fetch(query).then(setPost).catch(console.error);
  }, [slug]);

  if (!post) {
    return (
      <div className="pt-40 pb-20 min-h-screen flex justify-center items-center">
        <p className="text-xl text-[#6B7280] animate-pulse">Carregando artigo...</p>
      </div>
    );
  }

  // Ensinando o Tailwind a formatar os elementos visuais do texto rico!
  const myPortableTextComponents = {
    // TIPOS NOVOS (Imagens no meio do texto)
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) return null;
        return (
          <img
            alt={value.alt || 'Imagem do artigo'}
            loading="lazy"
            src={urlFor(value).auto('format').url()}
            className="rounded-xl shadow-md my-10 mx-auto max-h-[500px] object-cover"
          />
        );
      },
    },
    block: {
      normal: ({children}: any) => <p className="mb-6 text-lg text-[#4B5563] leading-relaxed">{children}</p>,
      h1: ({children}: any) => <h1 className="text-4xl font-serif font-bold text-[#1A3A52] mb-6 mt-12">{children}</h1>,
      h2: ({children}: any) => <h2 className="text-3xl font-serif font-bold text-[#1A3A52] mb-6 mt-12">{children}</h2>,
      h3: ({children}: any) => <h3 className="text-2xl font-serif font-bold text-[#1A3A52] mb-4 mt-8">{children}</h3>,
      blockquote: ({children}: any) => <blockquote className="border-l-4 border-[#C9A962] pl-6 py-2 italic text-xl text-[#6B7280] my-8 bg-[#FAFAF8]">{children}</blockquote>,
    },
    list: {
      bullet: ({children}: any) => <ul className="list-disc pl-8 mb-6 text-lg text-[#4B5563] space-y-2">{children}</ul>,
      number: ({children}: any) => <ol className="list-decimal pl-8 mb-6 text-lg text-[#4B5563] space-y-2">{children}</ol>,
    },
    marks: {
      strong: ({children}: any) => <strong className="font-bold text-[#1A3A52]">{children}</strong>,
      // ESTILO NOVO PARA LINKS:
      link: ({children, value}: any) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
        return (
          <a href={value.href} rel={rel} target="_blank" className="text-[#C9A962] font-semibold underline hover:text-[#1A3A52] transition-colors">
            {children}
          </a>
        );
      },
    }
  };

  return (
    <article className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/blog" className="inline-flex items-center text-[#C9A962] font-semibold hover:text-[#1A3A52] transition-colors mb-8">
          &larr; Voltar para o blog
        </Link>

        {/* IMAGEM DE CAPA NO TOPO DO ARTIGO */}
        {post.imagemCapaUrl && (
          <div className="w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden mb-12 shadow-lg">
            <img src={post.imagemCapaUrl} alt={post.titulo} className="w-full h-full object-cover" />
          </div>
        )}

        <header className="mb-12 pb-8 border-b border-gray-100 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1A3A52] mb-6 leading-tight">
            {post.titulo}
          </h1>
          <div className="flex items-center gap-4 text-sm text-[#6B7280] font-medium tracking-wide uppercase">
            <span>{new Date(post._createdAt).toLocaleDateString('pt-BR')}</span>
            <span className="text-[#C9A962]">•</span>
            <span>Por {post.autor}</span>
          </div>
        </header>

        <div className="prose-custom max-w-3xl mx-auto">
          <PortableText value={post.conteudo} components={myPortableTextComponents} />
        </div>
      </div>
    </article>
  );
}