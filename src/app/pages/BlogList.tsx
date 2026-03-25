import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../lib/sanity';

interface Post {
  _id: string;
  titulo: string;
  slug: { current: string };
  autor: string;
  _createdAt: string;
}

export function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Faz a página rolar para o topo ao carregar (para não começar no rodapé)
    window.scrollTo(0, 0);

    // Busca TODOS os posts, ordenados do mais novo para o mais velho
    const query = '*[_type == "post"] | order(_createdAt desc)';
    
    client.fetch(query).then((data) => {
      setPosts(data);
    }).catch(console.error);
  }, []);

  return (
    <div className="pt-32 pb-20 min-h-screen container mx-auto px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A3A52] mb-6">
          Blog da EndoClínica
        </h1>
        <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
          Explore nossos artigos sobre endocrinologia, qualidade de vida e tratamentos.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post._id} className="bg-white rounded-2xl p-8 shadow-sm border border-[rgba(26,58,82,0.08)] hover:shadow-lg transition-all flex flex-col h-full">
            <div className="flex-1">
              <p className="text-sm text-[#C9A962] font-semibold mb-3 tracking-wide">
                {new Date(post._createdAt).toLocaleDateString('pt-BR')} • {post.autor}
              </p>
              <h2 className="text-2xl font-serif font-bold text-[#1A3A52] mb-4">
                {post.titulo}
              </h2>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100">
              <Link 
                to={`/blog/${post.slug.current}`}
                className="inline-flex items-center text-[#1A3A52] font-semibold hover:text-[#C9A962] transition-colors"
              >
                Ler artigo completo &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}