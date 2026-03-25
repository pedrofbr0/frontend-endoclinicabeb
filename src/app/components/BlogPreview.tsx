import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../lib/sanity';

// 1. Adicionamos a imagem de capa na interface
interface Post {
    _id: string;
    titulo: string;
    slug: { current: string };
    autor: string;
    _createdAt: string;
    imagemCapaUrl?: string; // <-- Novo campo adicionado
}

export function BlogPreview() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 2. Atualizamos a query para pedir explicitamente a URL da imagem
        const query = `*[_type == "post"] | order(_createdAt desc)[0...3]{
            _id,
            titulo,
            slug,
            autor,
            _createdAt,
            "imagemCapaUrl": imagemCapa.asset->url
        }`;

        client.fetch(query).then((data) => {
            setPosts(data);
            setIsLoading(false);
        }).catch((err) => {
            console.error(err);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return null;

    if (posts.length === 0) return null;

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
                        Informações e dicas sobre saúde, metabolismo e bem-estar escritas pelos nossos especialistas.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        // Ajustámos o article para ter overflow-hidden (para a imagem não sair das bordas arredondadas) e flex-col
                        <article key={post._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[rgba(26,58,82,0.08)] hover:shadow-lg transition-all flex flex-col group">
                            
                            {/* 3. AQUI ESTÁ A IMAGEM DE CAPA */}
                            {post.imagemCapaUrl ? (
                                <div className="h-48 overflow-hidden">
                                    <img 
                                        src={post.imagemCapaUrl} 
                                        alt={post.titulo} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    />
                                </div>
                            ) : (
                                // Fallback: se o médico esquecer de colocar imagem, mostramos um fundo elegante
                                <div className="h-48 bg-[#1A3A52]/5 flex items-center justify-center">
                                    <span className="text-[#C9A962] font-serif italic opacity-50 text-xl">EndoClínica B&B</span>
                                </div>
                            )}

                            {/* O conteúdo de texto que já tínhamos, agora com flex-1 para empurrar o botão para baixo */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex-1">
                                    <p className="text-sm text-[#C9A962] font-semibold mb-3 tracking-wide">
                                        {new Date(post._createdAt).toLocaleDateString('pt-BR')} • {post.autor}
                                    </p>
                                    <h3 className="text-xl font-bold text-[#1A3A52] mb-4 line-clamp-2">
                                        {post.titulo}
                                    </h3>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <Link
                                        to={`/blog/${post.slug.current}`}
                                        className="inline-flex items-center text-[#1A3A52] font-semibold hover:text-[#C9A962] transition-colors"
                                    >
                                        Ler artigo completo &rarr;
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        to="/blog"
                        className="inline-block bg-[#1A3A52] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1A3A52]/90 transition-colors"
                    >
                        Ver todos os artigos
                    </Link>
                </div>
            </div>
        </section>
    );
}