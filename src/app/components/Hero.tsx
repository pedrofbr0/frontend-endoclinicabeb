import {ChevronRight} from 'lucide-react'

interface HeroProps {
  heroImageUrl?: string
}

export function Hero({heroImageUrl}: HeroProps) {
  return (
    <section
      id="home"
      className="pt-32 md:pt-40 pb-16 md:pb-24 bg-gradient-to-b from-[#FAFAF8] to-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A962]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-block mb-6 px-4 py-2 bg-[#E3D5B7]/30 rounded-full">
              <span className="text-[#1A3A52] text-sm font-semibold tracking-wide">
                Endocrinologia de Alto Padrão
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1A3A52] mb-6 leading-tight">
              Saúde endócrina: cuidado em dobro no seu acompanhamento metabólico
            </h1>

            <p className="text-lg md:text-xl text-[#6B7280] mb-8 leading-relaxed font-light">
              Unimos ciência, tecnologia e atendimento humanizado para cuidar de você.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contato"
                className="bg-[#C9A962] text-[#1A3A52] px-8 py-4 rounded-xl hover:bg-[#A08847] transition-all shadow-lg hover:shadow-xl font-semibold text-base flex items-center justify-center gap-2 min-h-[54px]"
              >
                Agendar Avaliação Personalizada
                <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href="#especialidades"
                className="border-2 border-[#1A3A52] text-[#1A3A52] px-8 py-4 rounded-xl hover:bg-[#1A3A52] hover:text-white transition-all font-semibold text-base min-h-[54px] text-center"
              >
                Nossas Especialidades
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-6">
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#C9A962] mb-1">
                  100%
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm text-[#6B7280] font-medium uppercase tracking-wider">
                  Foco no Paciente
                </p>
              </div>

              <div className="text-center border-x border-[rgba(26,58,82,0.1)] px-2">
                <div className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#C9A962] mb-1">
                  Alto Padrão
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm text-[#6B7280] font-medium uppercase tracking-wider">
                  Clínico e Científico
                </p>
              </div>

              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#C9A962] mb-1">
                  Formação
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm text-[#6B7280] font-medium uppercase tracking-wider">
                  de Excelência
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-2xl relative">
              {heroImageUrl ? (
                <img
                  src={`${heroImageUrl}?w=1600&auto=format&q=75`}
                  className="w-full h-[500px] md:h-[600px] lg:h-[750px] object-cover object-center"
                  alt="Equipe medica da EndoClinica B&B"
                />
              ) : (
                <div className="w-full h-[500px] md:h-[600px] lg:h-[750px] bg-slate-200 animate-pulse" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A3A52]/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
