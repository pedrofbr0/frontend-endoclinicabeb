'use client'

import {useState} from 'react'
import {Activity, Bone, Dumbbell, Pill, Scale, TestTube} from 'lucide-react'

const specialties = [
  {
    icon: Scale,
    title: 'Emagrecimento',
    description:
      'Tratamento individualizado para perda de peso saudavel e sustentavel, com abordagem multidisciplinar e acompanhamento continuo.',
    details: [
      'Avaliacao metabolica completa',
      'Plano nutricional personalizado',
      'Medicacoes quando indicado',
    ],
  },
  {
    icon: Activity,
    title: 'Diabetes',
    description:
      'Manejo completo de diabetes tipo 1, tipo 2 e gestacional com tecnologias avancadas de monitoramento e tratamento.',
    details: [
      'Controle glicemico otimizado',
      'Bomba de insulina e sensores',
      'Prevencao de complicacoes',
      'Educacao em diabetes',
    ],
  },
  {
    icon: Pill,
    title: 'Reposicao Hormonal',
    description:
      'Terapia hormonal personalizada para homens e mulheres, visando equilibrio, bem-estar e qualidade de vida.',
    details: [
      'Avaliacao hormonal completa',
      'Reposicao de testosterona',
      'Menopausa e andropausa',
      'Monitoramento continuo',
    ],
  },
  {
    icon: TestTube,
    title: 'Tireoide',
    description:
      'Diagnostico e tratamento de todas as doencas da tireoide, incluindo nodulos, hipo e hipertireoidismo.',
    details: [
      'Ultrassom com Doppler',
      'Puncao de nodulos (PAAF)',
      'Tratamento de Hashimoto',
      'Controle de hipotireoidismo',
    ],
  },
  {
    icon: Dumbbell,
    title: 'Endocrinologia Esportiva',
    description:
      'Otimizacao hormonal e metabolica para atletas e praticantes de atividade fisica de alto desempenho.',
    details: [
      'Performance e recuperacao',
      'Composicao corporal',
      'Prevencao de lesoes',
      'Nutricao esportiva',
    ],
  },
  {
    icon: Bone,
    title: 'Metabolismo Osseo',
    description:
      'Avaliacao e tratamento de doencas osseas como osteoporose, osteopenia e disturbios do calcio e vitamina D.',
    details: [
      'Avaliacao do metabolismo do calcio e vitamina D',
      'Investigacao de osteopenia e osteoporose',
      'Tratamento medicamentoso quando indicado',
      'Prevencao de fraturas e acompanhamento continuo',
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
            Nossas Especialidades Medicas
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            Oferecemos tratamento completo e personalizado para diversas condicoes endocrinas,
            sempre com base em evidencias cientificas.
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
