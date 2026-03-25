import { MapPin, Phone, Instagram, Facebook, Linkedin, Clock } from 'lucide-react';
import { client } from '../../lib/sanity';
import { useState, useEffect } from 'react';

// Define o formato dos dados que vêm do Sanity
interface ContatoData {
  telefone?: string;
  email?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  horarios?: { _key: string; dia: string; horas: string }[];
}

export function Contact() {
  const [contactData, setContactData] = useState<ContatoData | null>(null);
  const [whatsappNumber, setWhatsappNumber] = useState('');

  useEffect(() => {
    // Busca TODOS os campos do documento de contato
    client.fetch('*[_type == "contato"][0]').then((data) => {
      if (data) {
        setContactData(data);
        if (data.telefone) {
          const cleanedNumber = data.telefone.replace(/\D/g, '');
          setWhatsappNumber(cleanedNumber);
        }
      }
    });
  }, []);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const message = 'Olá! Gostaria de agendar uma avaliação personalizada.';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numeroWhatsApp = `55${whatsappNumber}`;
    const textoMensagem = `Olá, vim pelo site! Meu nome é *${formData.nome}*.

*E-mail:* ${formData.email}
*Telefone:* ${formData.telefone}

*Mensagem:*
${formData.mensagem}`;

    const textoCodificado = encodeURIComponent(textoMensagem);
    const url = `https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contato" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#C9A962] text-sm font-semibold tracking-wider uppercase">Contato</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1A3A52] mb-6">
            Entre em Contato
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            Estamos prontos para atendê-lo com excelência. Agende sua avaliação personalizada.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-serif font-bold text-[#1A3A52] mb-8">
              Informações de Contato
            </h3>

            <div className="space-y-6">

              {/* Endereço Dinâmico */}
              {(contactData?.logradouro || contactData?.numero || contactData?.bairro || contactData?.cidade || contactData?.estado || contactData?.cep) && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C9A962] to-[#A08847] text-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1A3A52] mb-2">Endereço Clínica</h4>
                    <address className="text-[#6B7280] not-italic leading-relaxed">
                      {contactData.logradouro && <>{contactData.logradouro}, {contactData.numero}</>}
                      {contactData.bairro && <><br />{contactData.bairro}</>}, {contactData.cidade && <>{contactData.cidade} - {contactData.estado}</>}
                      {contactData.cep && <><br />CEP: {contactData.cep}</>}
                    </address>
                  </div>
                </div>
              )}

              {/* Telefone Dinâmico */}
              {contactData?.telefone && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C9A962] to-[#A08847] text-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1A3A52] mb-2">Telefone e WhatsApp</h4>
                    <p className="text-[#6B7280]">
                      <a href={`https://wa.me/55${whatsappNumber}?text=${encodeURIComponent(message)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#C9A962] transition-colors block">
                        {contactData.telefone}
                      </a>
                    </p>
                  </div>
                </div>
              )}

              {/* Horários Dinâmicos (Mapeando o Array do Sanity) */}
              {contactData?.horarios && contactData.horarios.length > 0 && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C9A962] to-[#A08847] text-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1A3A52] mb-2">Horários de Atendimento</h4>
                    <p className="text-[#6B7280] leading-relaxed">
                      {contactData.horarios.map((item) => (
                        <span key={item._key} className="block">
                          {item.dia}: {item.horas}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Redes Sociais Dinâmicas (Só renderiza se tiver link cadastrado) */}
            {(contactData?.instagram || contactData?.facebook || contactData?.linkedin) && (
              <div className="mt-8 pt-8 border-t border-[rgba(26,58,82,0.08)]">
                <h4 className="font-semibold text-[#1A3A52] mb-4">Redes Sociais</h4>
                <div className="flex gap-3">
                  {contactData.instagram && (
                    <a href={contactData.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#E3D5B7]/30 rounded-lg flex items-center justify-center hover:bg-[#C9A962] hover:text-white transition-all">
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {contactData.facebook && (
                    <a href={contactData.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#E3D5B7]/30 rounded-lg flex items-center justify-center hover:bg-[#C9A962] hover:text-white transition-all">
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {contactData.linkedin && (
                    <a href={contactData.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#E3D5B7]/30 rounded-lg flex items-center justify-center hover:bg-[#C9A962] hover:text-white transition-all">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* COLUNA DA DIREITA: Formulário */}
          <div>
            <div className="bg-[#FAFAF8] p-8 md:p-10 rounded-2xl border border-[rgba(26,58,82,0.08)]">
              <h3 className="text-2xl font-serif font-bold text-[#1A3A52] mb-6">
                Envie uma Mensagem
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-[#1A3A52] font-semibold mb-2 text-sm">Nome Completo</label>
                  <input type="text" name="nome" value={formData.nome} onChange={handleChange} required id="name" className="w-full px-4 py-3.5 bg-white border border-[rgba(26,58,82,0.1)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A962] transition-all" placeholder="Seu nome completo" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[#1A3A52] font-semibold mb-2 text-sm">E-mail</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required id="email" className="w-full px-4 py-3.5 bg-white border border-[rgba(26,58,82,0.1)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A962] transition-all" placeholder="seu@email.com" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[#1A3A52] font-semibold mb-2 text-sm">Telefone / WhatsApp</label>
                  <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} required id="phone" className="w-full px-4 py-3.5 bg-white border border-[rgba(26,58,82,0.1)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A962] transition-all" placeholder="(34) 99999-9999" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[#1A3A52] font-semibold mb-2 text-sm">Mensagem</label>
                  <textarea id="message" name="mensagem" value={formData.mensagem} onChange={handleChange} required rows={4} className="w-full px-4 py-3.5 bg-white border border-[rgba(26,58,82,0.1)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A962] transition-all resize-none" placeholder="Como podemos ajudá-lo?"></textarea>
                </div>
                <button type="submit" className="w-full bg-[#C9A962] text-[#1A3A52] px-8 py-4 rounded-xl hover:bg-[#A08847] transition-all font-semibold shadow-lg hover:shadow-xl min-h-[54px]">
                  Enviar Mensagem
                </button>
                <p className="text-xs text-[#6B7280] text-center">Responderemos em até 24 horas úteis</p>
              </form>
            </div>
          </div>
        </div>

        {/* MAPA */}
        <div className="rounded-2xl overflow-hidden shadow-xl h-96 border border-[rgba(26,58,82,0.08)]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3755.0447912826357!2d-47.9221599!3d-19.753251499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94bad0278cab06bd%3A0x43e3e0b49384efd8!2sAv.%20Leopoldino%20de%20Oliveira%2C%202025%20-%20Estados%20Unidos%2C%20Uberaba%20-%20MG%2C%2038026-435!5e0!3m2!1spt-BR!2sbr!4v1774419647264!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização da EndoClínica B&B"
          ></iframe>
        </div>
      </div>
    </section>
  );
}