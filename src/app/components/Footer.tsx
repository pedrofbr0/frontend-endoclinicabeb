import { MapPin, Phone, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A3A52] text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              <span className="text-[#C9A962]">Endo</span><span className="text-white">Clínica</span> <span className="text-[#C9A962]">B&B</span>
            </h3>
            <p className="text-white/80 leading-relaxed mb-6">
              Endocrinologia de alto padrão, unindo ciência, tecnologia e atendimento humanizado.
            </p>
            <div className="flex items-start gap-2 text-white/80">
              <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-[#C9A962]" />
              <address className="not-italic text-sm leading-relaxed">
                Av. Leopoldino de Oliveira, 2025<br />
                Estados Unidos, Uberaba - MG<br />
                CEP: 38015-000
              </address>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Navegação</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <button 
                  onClick={() => {
                    const element = document.getElementById('home');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#C9A962] transition-colors text-sm"
                >
                  Início
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const element = document.getElementById('diferenciais');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#C9A962] transition-colors text-sm"
                >
                  Diferenciais
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const element = document.getElementById('especialidades');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#C9A962] transition-colors text-sm"
                >
                  Especialidades
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const element = document.getElementById('equipe');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#C9A962] transition-colors text-sm"
                >
                  Nossa Equipe
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const element = document.getElementById('contato');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#C9A962] transition-colors text-sm"
                >
                  Contato
                </button>
              </li>
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
            <ul className="space-y-3 text-white/80 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C9A962]" />
                <a href="tel:+5534984477953" className="hover:text-[#C9A962] transition-colors">
                  (34) 98447-7953
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <h5 className="font-semibold text-sm mb-3">Horários de Atendimento</h5>
              <p className="text-white/80 text-sm leading-relaxed">
                Terça: 8h às 12h e 15h às 19h<br />
                Quarta: 8h às 12h e 15h às 19h<br />
                Sábado: 8h às 12h
              </p>
            </div>
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
              Dr. Rui Barbosa - CRM/MG 70638 | Dr. Yuri Bittencourt - CRM/MG 86135
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
