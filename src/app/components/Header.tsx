import { Phone, Mail, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react'
import { client } from '../../lib/sanity' // ou o caminho onde você salvou o client

export function Header() {
  const [telefone, setTelefone] = useState('(34) 98447-7953')
  const [email, setEmail] = useState()
  
  useEffect(() => {
    client.fetch('*[_type == "contato"][0]').then((dados) => {
      if (dados && dados.telefone) {
        setTelefone(dados.telefone)
      }
      if (dados && dados.email) {
        setEmail(dados.email)
      }
    })
  }, [])

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#FAFAF8]/95 backdrop-blur-md shadow-sm z-50 border-b border-[rgba(26,58,82,0.08)]">
      <div className="bg-[#1A3A52] text-white py-2.5">
        <div className="container mx-auto px-4 flex justify-end gap-6 text-sm">
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
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-2xl md:text-3xl font-serif font-bold">
              <span className="text-[#C9A962]">Endo</span><span className="text-[#1A3A52]">Clínica</span> <span className="text-[#C9A962]">B&B</span>
            </h2>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-[15px] font-medium"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('diferenciais')} 
              className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-[15px] font-medium"
            >
              Diferenciais
            </button>
            <button 
              onClick={() => scrollToSection('especialidades')} 
              className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-[15px] font-medium"
            >
              Especialidades
            </button>
            <button 
              onClick={() => scrollToSection('equipe')} 
              className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-[15px] font-medium"
            >
              Equipe
            </button>
            <button 
              onClick={() => scrollToSection('contato')} 
              className="bg-[#C9A962] text-[#1A3A52] px-6 py-2.5 rounded-xl hover:bg-[#A08847] transition-all shadow-md hover:shadow-lg font-semibold min-h-[44px]"
            >
              Agendar Avaliação
            </button>
          </nav>

          <button 
            className="lg:hidden text-[#1A3A52] p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden mt-6 pb-4 flex flex-col gap-4 border-t border-[rgba(26,58,82,0.08)] pt-4">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-left font-medium"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('diferenciais')} 
              className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-left font-medium"
            >
              Diferenciais
            </button>
            <button 
              onClick={() => scrollToSection('especialidades')} 
              className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-left font-medium"
            >
              Especialidades
            </button>
            <button 
              onClick={() => scrollToSection('equipe')} 
              className="text-[#2C3E50] hover:text-[#C9A962] transition-colors text-left font-medium"
            >
              Equipe
            </button>
            <button 
              onClick={() => scrollToSection('contato')}
              className="bg-[#C9A962] text-[#1A3A52] px-6 py-3 rounded-xl hover:bg-[#A08847] transition-all text-center font-semibold min-h-[44px]"
            >
              Agendar Avaliação
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
