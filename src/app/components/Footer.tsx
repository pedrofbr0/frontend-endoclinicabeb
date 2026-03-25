import { MapPin, Phone, Heart } from 'lucide-react';
import { client } from '../../lib/sanity';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

interface ContatoData {
  telefone?: string;
  endereco?: string;
  cidadeEstado?: string;
  cep?: string;
  horarios?: { _key: string; dia: string; horas: string }[];
}

interface DoctorData {
  nome: string;
  crm: string;
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const [contactData, setContactData] = useState<ContatoData | null>(null);
  const [doctorsData, setDoctorsData] = useState<DoctorData[]>([]);
  // 1. Novo estado para o Blog
  const [hasBlogPosts, setHasBlogPosts] = useState(false);
  // 2. Novo estado para a logo
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    // 2. Adicionamos a contagem de posts na nossa busca simultânea
    Promise.all([
      client.fetch('*[_type == "contato"][0]'),
      client.fetch('*[_type == "informacoesMedicos"]{nome, crm}'),
      client.fetch('count(*[_type == "post"])'), // <-- Conta os artigos
      client.fetch('*[_type == "configuracoesSite"][0]{"url": logo.asset->url}')
    ])
      .then(([contato, medicos, countBlog, configSite]) => {
        if (contato) setContactData(contato);
        if (medicos) setDoctorsData(medicos);
        // Atualiza o estado: se for maior que 0, é true.
        setHasBlogPosts(countBlog > 0);
        // 3. Salva a logo se ela existir
        if (configSite?.url) setLogoUrl(configSite.url);
      })
      .catch(console.error);
  }, []);

  const handleNavClick = (id: string) => {
    if (location.pathname === '/') {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      if (id === 'home') navigate('/');
      else navigate(`/#${id}`);
    }
  };

  const telefoneLimpo = contactData?.telefone?.replace(/\D/g, '') || '34984477953';

  const message = 'Olá! Gostaria de agendar uma avaliação personalizada.';

  return (
    <footer className="bg-[#1A3A52] text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">

          <div>
            <div className="flex items-center gap-3 mb-4">
              {logoUrl && (
                <img src={logoUrl} alt="Logo" className="h-4 md:h-6 w-auto invert brightness-0" />
              )}
              <h3 className="text-2xl md:text-3xl font-serif font-bold">
                <span className="text-[#C9A962]">Endo</span><span className="text-white">Clínica</span> <span className="text-[#C9A962]">B&B</span>
              </h3>
            </div>

            <p className="text-white/80 leading-relaxed mb-6">
              Endocrinologia de alto padrão, unindo ciência, tecnologia e atendimento humanizado.
            </p>

            {(contactData?.endereco || contactData?.cidadeEstado) && (
              <div className="flex items-start gap-2 text-white/80">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-[#C9A962]" />
                <address className="not-italic text-sm leading-relaxed">
                  {contactData.endereco && <>{contactData.endereco}<br /></>}
                  {contactData.cidadeEstado && <>{contactData.cidadeEstado}<br /></>}
                  {contactData.cep && <>CEP: {contactData.cep}</>}
                </address>
              </div>
            )}
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Navegação</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-[#C9A962] transition-colors text-sm">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('diferenciais')} className="hover:text-[#C9A962] transition-colors text-sm">
                  Diferenciais
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('especialidades')} className="hover:text-[#C9A962] transition-colors text-sm">
                  Especialidades
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('equipe')} className="hover:text-[#C9A962] transition-colors text-sm">
                  Nossa Equipe
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contato')} className="hover:text-[#C9A962] transition-colors text-sm">
                  Contato
                </button>
              </li>

              {/* 3. O botão do blog agora só aparece se hasBlogPosts for verdadeiro */}
              {hasBlogPosts && (
                <li>
                  <Link to="/blog" className="hover:text-[#C9A962] transition-colors text-sm">
                    Blog
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Especialidades</h4>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>Emagrecimento</li>
              <li>Diabetes</li>
              <li>Reposição Hormonal</li>
              <li>Tireoide</li>
              <li>Endocrinologia Esportiva</li>
              <li>Metabolismo Ósseo</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Contato</h4>

            {contactData?.telefone && (
              <ul className="space-y-3 text-white/80 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C9A962]" />
                  <a href={`https://wa.me/55${telefoneLimpo}?text=${encodeURIComponent(message)}`} className="hover:text-[#C9A962] transition-colors">
                    {contactData.telefone}
                  </a>
                </li>
              </ul>
            )}

            {contactData?.horarios && contactData.horarios.length > 0 && (
              <div className="mt-6">
                <h5 className="font-semibold text-sm mb-3">Horários de Atendimento</h5>
                <p className="text-white/80 text-sm leading-relaxed">
                  {contactData.horarios.map((item) => (
                    <span key={item._key} className="block">
                      {item.dia}: {item.horas}
                    </span>
                  ))}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
              © {currentYear} EndoClínica B&B. Todos os direitos reservados.
            </p>
            <p className="text-white/70 text-sm flex items-center gap-2">
              Feito com <Heart className="w-4 h-4 fill-[#C9A962] text-[#C9A962]" /> para nossos pacientes
            </p>
          </div>
          <div className="mt-4 text-center md:text-left">
            <p className="text-white/60 text-xs">
              {doctorsData.length > 0
                ? doctorsData.map(d => `${d.nome} - ${d.crm}`).join(' | ')
                : 'Médicos Especialistas'
              }
            </p>
            <p className="text-white/60 text-xs mt-1">
              Especialistas em Endocrinologia e Metabologia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}