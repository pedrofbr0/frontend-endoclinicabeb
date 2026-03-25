import { Phone, Mail, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { client } from '../../lib/sanity';
import { useNavigate, useLocation } from 'react-router-dom';

export function Header() {
  const [telefone, setTelefone] = useState('(34) 98447-7953');
  const [email, setEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasBlogPosts, setHasBlogPosts] = useState(false);

  // 1. NOVO ESTADO: Para guardar a URL da logo
  const [logoUrl, setLogoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    Promise.all([
      client.fetch('*[_type == "contato"][0]'),
      client.fetch('count(*[_type == "post"])'),
      // 2. NOVA BUSCA: Traz a URL da logo usando o nome do seu schema (se for 'imagens', troque aqui)
      client.fetch('*[_type == "configuracoesSite"][0]{"url": logo.asset->url}')
    ])
      .then(([dadosContato, countBlog, configSite]) => {
        if (dadosContato?.telefone) setTelefone(dadosContato.telefone);
        if (dadosContato?.email) setEmail(dadosContato.email);
        setHasBlogPosts(countBlog > 0);

        // 3. Salva a logo se ela existir
        if (configSite?.url) setLogoUrl(configSite.url);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false); // Fecha o menu mobile, se estiver aberto

    // 1. REGRA ESPECIAL SÓ PARA O BOTÃO DO BLOG
    if (id === 'blog') {
      if (location.pathname.startsWith('/blog')) {
        // Se já estamos dentro da área do blog...
        if (location.pathname === '/blog') {
          // Se já está na lista, só rola pro topo
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          // Se está lendo um artigo, volta para a lista
          navigate('/blog');
        }
      } else {
        // Se estamos na Home, rola até a seção de destaques
        const element = document.getElementById('blog');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
      return; // Encerra a função aqui para o botão do blog não rodar o código de baixo
    }

    // 2. REGRA NORMAL PARA OS OUTROS BOTÕES (Início, Equipe, Contato, etc)
    if (location.pathname === '/') {
      // Se já está na Home, só faz o scroll
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Se está no Blog e clica em "Equipe" ou "Contato", volta pra Home ancorado na seção certa
      if (id === 'home') {
        navigate('/');
      } else {
        navigate(`/#${id}`);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#FAFAF8]/95 backdrop-blur-md shadow-sm z-50 border-b border-[rgba(26,58,82,0.08)]">
      <div className="bg-[#1A3A52] text-white py-2.5 min-h-[40px]">
        <div className="container mx-auto px-4 flex justify-end gap-6 text-sm">
          {isLoading ? (
            <div className="flex items-center gap-4">
              <div className="w-32 h-4 bg-white/20 rounded animate-pulse"></div>
            </div>
          ) : (
            <>
              <a href={`tel:+55${telefone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-2 hover:text-[#C9A962] transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{telefone}</span>
              </a>
              {email && (
                <a href={`mailto:${email}`} className="hidden md:flex items-center gap-2 hover:text-[#C9A962] transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{email}</span>
                </a>
              )}
            </>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          <div className="flex items-center">
            <button onClick={() => handleNavClick('home')} className="cursor-pointer text-left flex items-center gap-3">

              {isLoading ? (
                // 1. Skeleton: Aparece enquanto o Sanity busca os dados
                <>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-48 h-8 bg-gray-200 rounded animate-pulse hidden sm:block"></div>
                </>
              ) : (
                // 2. Conteúdo Real: Aparecem os dois perfeitamente sincronizados
                <>
                  {logoUrl && (
                    <img
                      src={logoUrl}
                      alt="EndoClínica B&B Logo"
                      className="h-8 md:h-10 w-auto object-contain"
                    />
                  )}
                  <span className="text-2xl md:text-3xl font-serif font-bold">
                    <span className="text-[#C9A962]">Endo</span><span className="text-[#1A3A52]">Clínica</span> <span className="text-[#C9A962]">B&B</span>
                  </span>
                </>
              )}

            </button>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {isLoading ? (
              <div className="flex items-center gap-8">
                <div className="w-44 h-11 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            ) : (
              <>
                <button onClick={() => handleNavClick('home')} className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-[15px] font-medium">Início</button>
                <button onClick={() => handleNavClick('diferenciais')} className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-[15px] font-medium">Diferenciais</button>
                <button onClick={() => handleNavClick('especialidades')} className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-[15px] font-medium">Especialidades</button>
                <button onClick={() => handleNavClick('equipe')} className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-[15px] font-medium">Equipe</button>
                {hasBlogPosts && (
                  <button onClick={() => handleNavClick('blog')} className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-[15px] font-medium">Blog</button>
                )}
                <button onClick={() => handleNavClick('contato')} className="bg-[#C9A962] text-[#1A3A52] px-6 py-2.5 rounded-xl hover:bg-[#A08847] transition-all shadow-md hover:shadow-lg font-semibold min-h-[44px]">
                  Agendar Avaliação
                </button>
              </>
            )}
          </nav>

          <button className="lg:hidden text-[#1A3A52] p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* ... (Seu menu mobile continua igual) ... */}
        {isMenuOpen && !isLoading && (
          <nav className="lg:hidden mt-6 pb-4 flex flex-col gap-4 border-t border-[rgba(26,58,82,0.08)] pt-4">
            <button onClick={() => handleNavClick('home')} className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-left font-medium">Início</button>
            <button onClick={() => handleNavClick('diferenciais')} className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-left font-medium">Diferenciais</button>
            <button onClick={() => handleNavClick('especialidades')} className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-left font-medium">Especialidades</button>
            <button onClick={() => handleNavClick('equipe')} className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-left font-medium">Equipe</button>
            {hasBlogPosts && (
              <button onClick={() => handleNavClick('blog')} className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-left font-medium">Blog</button>
            )}
            <button onClick={() => handleNavClick('contato')} className="bg-[#C9A962] text-[#1A3A52] px-6 py-3 rounded-xl hover:bg-[#A08847] transition-all text-center font-semibold min-h-[44px]">
              Agendar Avaliação
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}