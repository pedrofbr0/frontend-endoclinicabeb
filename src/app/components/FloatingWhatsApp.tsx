import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { client } from '../../lib/sanity';

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');

  useEffect(() => {

    client.fetch('*[_type == "contato"][0]').then((data) => {
      if (data?.telefone) {
        const cleanedNumber = data.telefone.replace(/\D/g, '');
        setWhatsappNumber(cleanedNumber);
      }
    })

  }, []);
  const message = 'Olá! Gostaria de agendar uma avaliação personalizada.';

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={`https://wa.me/55${whatsappNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full w-14 h-14 md:w-16 md:h-16 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Conversar no WhatsApp"
      >
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8 animate-pulse" />
        
        {showTooltip && (
          <div className="hidden md:block absolute right-full mr-4 bg-[#1A3A52] text-white px-5 py-3 rounded-xl whitespace-nowrap shadow-2xl border border-[#C9A962]/20">
            <span className="text-sm font-semibold">Fale conosco no WhatsApp!</span>
            <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 border-8 border-transparent border-l-[#1A3A52]"></div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
      </a>
    </div>
  );
}
