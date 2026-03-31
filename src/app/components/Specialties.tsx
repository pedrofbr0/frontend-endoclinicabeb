'use client'

import {useState} from 'react'
import {Activity, Bone, Dumbbell, Pill, Scale, TestTube} from 'lucide-react'

const specialties = [
  {
    icon: Scale,
    title: 'Emagrecimento',
    description:
      'Tratamento individualizado para perda de peso saudavel e sustentável, com abordagem multidisciplinar e acompanhamento contínuo.',
    details: [
      'Avaliação metabólica completa',
      'Plano nutricional personalizado',
      'Medicações quando indicado',
    ],
  },
  {
    icon: Activity,
    title: 'Diabetes',
    description:
      'Manejo completo de diabetes tipo 1, tipo 2 e gestacional com tecnologias avançadas de monitoramento e tratamento.',
    details: [
      'Controle glicêmico otimizado',
      'Bomba de insulina e sensores',
      'Prevenção de complicações',
      'Educação em diabetes',
    ],
  },
  {
    icon: Pill,
    title: 'Reposição Hormonal',
    description:
      'Terapia hormonal personalizada para homens e mulheres, visando equilíbrio, bem-estar e qualidade de vida.',
    details: [
      'Avaliação hormonal completa',
      'Reposição de testosterona',
      'Menopausa e andropausa',
      'Monitoramento contínuo',
    ],
  },
  {
    icon: TestTube,
    title: 'Tireoide',
    description:
      'Diagnóstico e tratamento de todas as doenças da tireoide, incluindo nódulos, hipo e hipertireoidismo.',
    details: [
      'Ultrassom com Doppler',
      'Punção de nódulos (PAAF)',
      'Tratamento de Hashimoto',
      'Controle de hipotireoidismo',
    ],
  },
  {
    icon: Dumbbell,
    title: 'Endocrinologia Esportiva',
    description:
      'Otimização hormonal e metabólica para atletas e praticantes de atividade física de alto desempenho.',
    details: [
      'Performance e recuperação',
      'Composição corporal',
      'Prevenção de lesões',
      'Nutrição esportiva',
    ],
  },
  {
    icon: Bone,
    title: 'Metabolismo Ósseo',
    description:
      'Avaliação e tratamento de doenças osseas como osteoporose, osteopenia e disturbios do cálcio e vitamina D.',
    details: [
      'Avaliação do metabolismo do calcio e vitamina D',
      'Investigação de osteopenia e osteoporose',
      'Tratamento medicamentoso quando indicado',
      'Prevenção de fraturas e acompanhamento contínuo',
    ],
  },
]

export function Specialties() {
  const [activeCard, setActiveCard] = useState<number | null>(null)

  return (
    <section id="especialidades" className="py-20 md:py-28 bg-gradient-to-b from-[#FAFAF8] to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#C9A962] text-sm font-semibold tracking-wider uppercase">
              Nossas Especialidades
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1A3A52] mb-6">
            Nossas Especialidades Médicas
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            Oferecemos tratamento completo e personalizado para diversas condições endócrinas,
            sempre com base em evidências científicas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {specialties.map((specialty, index) => {
            const Icon = specialty.icon
            const isActive = activeCard === index

            return (
              <div
                key={specialty.title}
                className={`bg-white p-8 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'border-[#C9A962] shadow-2xl scale-105'
                    : 'border-[rgba(26,58,82,0.08)] hover:border-[#C9A962]/30 hover:shadow-xl'
                }`}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="mb-6">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-br from-[#C9A962] to-[#A08847] scale-110'
                        : 'bg-[#E3D5B7]/30'
                    }`}
                  >
                    <Icon
                      className={`w-7 h-7 transition-colors ${
                        isActive ? 'text-white' : 'text-[#1A3A52]'
                      }`}
                    />
                  </div>
                </div>

                <h3 className="text-xl font-serif font-semibold text-[#1A3A52] mb-3">
                  {specialty.title}
                </h3>

                <p className="text-[#6B7280] leading-relaxed mb-4">{specialty.description}</p>

                {isActive ? (
                  <div className="mt-4 pt-4 border-t border-[rgba(26,58,82,0.08)] animate-fadeIn">
                    <ul className="space-y-2">
                      {specialty.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2 text-sm text-[#6B7280]">
                          <div className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-1.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#contato"
            className="bg-[#1A3A52] text-white px-8 py-4 rounded-xl hover:bg-[#0F2333] transition-all shadow-lg hover:shadow-xl font-semibold inline-flex items-center gap-2 min-h-[54px]"
          >
            Agendar Consulta
          </a>
        </div>
      </div>
    </section>
  )
}
