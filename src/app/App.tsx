import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ValueProposition } from './components/ValueProposition';
import { Specialties } from './components/Specialties';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BlogPreview } from './components/BlogPreview';
import { BlogList } from './pages/BlogList';
import { BlogPost } from './pages/BlogPost';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function LandingPage() {

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Se a URL tiver um # (ex: /#equipe), pega o nome e rola até lá
      const id = location.hash.substring(1); 
      const element = document.getElementById(id);
      if (element) {
        // Um pequeno atraso garante que a página desenhou antes de rolar
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Se for apenas "/", garante que começa no topo
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <main>
      <Hero />
      <ValueProposition />
      <Specialties />
      <Team />
      <BlogPreview />
      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FAFAF8]">
        <Header />
        <Routes>
            {/* Rota principal (Landing Page) */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Rotas do Blog que faremos a seguir */}
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  );
}
