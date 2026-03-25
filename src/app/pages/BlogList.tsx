import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../lib/sanity';
import { Search } from 'lucide-react';

interface Post {
  _id: string;
  titulo: string;
  slug: { current: string };
  autor: string;
  _createdAt: string;
  imagemCapaUrl?: string; // Novo campo
}

export function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Esse useEffect é acionado toda vez que o 'searchTerm' muda
  useEffect(() => {
    setIsSearching(true);

    // Um pequeno "delay" para não fazer 10 requisições se o usuário digitar 10 letras rápido
    const delayDebounceFn = setTimeout(() => {
      
      // A mágica do GROQ: Se tiver texto na busca, procuramos em 3 lugares diferentes ao mesmo tempo!
      const filter = searchTerm 
        ? `&& [titulo, autor, pt::text(conteudo)] match "*${searchTerm}*"` 
        : '';

      const query = `*[_type == "post" ${filter}] | order(_createdAt desc){
        _id,
        titulo,
        slug,
        autor,
        _createdAt,
        "imagemCapaUrl": imagemCapa.asset->url
      }`;
      
      client.fetch(query).then((data) => {
        setPosts(data);
        setIsSearching(false);
      }).catch(console.error);

    }, 400); // Espera 400ms depois que o usuário parar de digitar

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#FAFAF8]">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A3A52] mb-6">
            Blog da EndoClínica
          </h1>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto mb-10">
            Explore nossos artigos sobre endocrinologia, qualidade de vida e tratamentos.
          </p>

          {/* BARRA DE BUSCA */}
          <div className="max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar por título, assunto ou médico..."
              className="w-full pl-11 pr-4 py-4 rounded-xl border border-gray-200 focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* MENSAGEM SE NÃO ENCONTRAR NADA */}
        {posts.length === 0 && !isSearching && (
          <div className="text-center py-20">
            <p className="text-xl text-[#6B7280]">Nenhum artigo encontrado para "{searchTerm}".</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[rgba(26,58,82,0.08)] hover:shadow-lg transition-all flex flex-col h-full group">
              {/* IMAGEM DE CAPA */}
              {post.imagemCapaUrl ? (
                <div className="h-48 overflow-hidden">
                  <img src={post.imagemCapaUrl} alt={post.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              ) : (
                <div className="h-48 bg-[#1A3A52]/5 flex items-center justify-center">
                  <span className="text-[#C9A962] font-serif italic opacity-50 text-xl">EndoClínica B&B</span>
                </div>
              )}
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex-1">
                  <p className="text-sm text-[#C9A962] font-semibold mb-3 tracking-wide">
                    {new Date(post._createdAt).toLocaleDateString('pt-BR')} • {post.autor}
                  </p>
                  <h2 className="text-2xl font-serif font-bold text-[#1A3A52] mb-4">
                    {post.titulo}
                  </h2>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <Link to={`/blog/${post.slug.current}`} className="inline-flex items-center text-[#1A3A52] font-semibold hover:text-[#C9A962] transition-colors">
                    Ler artigo completo &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}