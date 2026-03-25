import { Phone, Mail, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { client } from '../../lib/sanity';
import { useNavigate, useLocation } from 'react-router-dom';

export function Header() {
  const [telefone, setTelefone] = useState('(34) 98447-7953');
  const [email, setEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasBlogPosts, setHasBlogPosts] = useState(false);
  
  // NOVO: Estado para controlar o esqueleto de carregamento
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Promise.all executa as duas buscas ao mesmo tempo e espera ambas terminarem
    Promise.all([
      client.fetch('*[_type == "contato"][0]'),
      client.fetch('count(*[_type == "post"])')
    ])
    .then(([dadosContato, countBlog]) => {
      if (dadosContato?.telefone) setTelefone(dadosContato.telefone);
      if (dadosContato?.email) setEmail(dadosContato.email);
      setHasBlogPosts(countBlog > 0);
    })
    .catch(console.error)
    .finally(() => {
      // Independente de dar erro ou sucesso, tira o estado de carregamento
      setIsLoading(false);
    });
  }, []);

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      if (id === 'home') {
        navigate('/');
      } else {
        navigate(`/#${id}`);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#FAFAF8]/95 backdrop-blur-md shadow-sm z-50 border-b border-[rgba(26,58,82,0.08)]">
      {/* Barra superior (Contatos) */}
      <div className="bg-[#1A3A52] text-white py-2.5 min-h-[40px]">
        <div className="container mx-auto px-4 flex justify-end gap-6 text-sm">
          {isLoading ? (
            // Skeleton dos contatos (Barrinhas pulsantes simulando o texto)
            <div className="flex items-center gap-4">
              <div className="w-32 h-4 bg-white/20 rounded animate-pulse"></div>
              <div className="hidden md:block w-40 h-4 bg-white/20 rounded animate-pulse"></div>
            </div>
          ) : (
            // Contatos reais
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
      
      {/* Navegação Principal */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* A Logo carrega instantaneamente */}
          <div className="flex items-center">
            <button onClick={() => handleNavClick('home')} className="text-2xl md:text-3xl font-serif font-bold cursor-pointer text-left">
              <span className="text-[#C9A962]">Endo</span><span className="text-[#1A3A52]">Clínica</span> <span className="text-[#C9A962]">B&B</span>
            </button>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8">
            {isLoading ? (
              // Skeleton do Menu
              <div className="flex items-center gap-8">
                <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-28 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                {/* Skeleton do botão principal */}
                <div className="w-44 h-11 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            ) : (
              // Menu real
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

        {/* Menu Mobile */}
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