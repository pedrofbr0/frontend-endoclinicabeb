import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../../lib/sanity';
import { PortableText } from '@portabletext/react';

export function BlogPost() {
  // Pega o "slug" (o pedaço final da URL)
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Busca APENAS o post que tem o slug igual ao da URL
    const query = `*[_type == "post" && slug.current == "${slug}"][0]`;
    
    client.fetch(query).then((data) => {
      setPost(data);
    }).catch(console.error);
  }, [slug]);

  // Se ainda estiver carregando a API, mostra essa tela
  if (!post) {
    return (
      <div className="pt-40 pb-20 min-h-screen flex justify-center items-center">
        <p className="text-xl text-[#6B7280] animate-pulse">Carregando artigo...</p>
      </div>
    );
  }

  // Dicionário de estilos para traduzir o texto rico do Sanity em Tailwind
  const myPortableTextComponents = {
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
    }
  };

  return (
    <article className="pt-32 pb-24 px-4 max-w-3xl mx-auto min-h-screen">
      {/* Botão de voltar */}
      <Link 
        to="/blog" 
        className="inline-flex items-center text-[#C9A962] font-semibold hover:text-[#1A3A52] transition-colors mb-10"
      >
        &larr; Voltar para o blog
      </Link>

      {/* Cabeçalho do Post */}
      <header className="mb-12 pb-8 border-b border-gray-200">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1A3A52] mb-6 leading-tight">
          {post.titulo}
        </h1>
        <div className="flex items-center gap-4 text-sm text-[#6B7280] font-medium tracking-wide uppercase">
          <span>{new Date(post._createdAt).toLocaleDateString('pt-BR')}</span>
          <span className="text-[#C9A962]">•</span>
          <span>Por {post.autor}</span>
        </div>
      </header>

      {/* Conteúdo do Post gerado pelo Sanity */}
      <div className="prose-custom">
        <PortableText 
          value={post.conteudo} 
          components={myPortableTextComponents} 
        />
      </div>
    </article>
  );
}