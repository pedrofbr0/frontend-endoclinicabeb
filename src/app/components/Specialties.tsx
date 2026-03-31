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
          {specialties.map((specialty) => {
            const Icon = specialty.icon

            return (
              <div
                key={specialty.title}
                className="group flex h-full flex-col rounded-2xl border border-[rgba(26,58,82,0.08)] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A962]/25 hover:shadow-xl"
              >
                <div className="mb-6">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#E3D5B7]/30 transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-[#C9A962] group-hover:to-[#A08847]"
                  >
                    <Icon className="h-7 w-7 text-[#1A3A52] transition-colors group-hover:text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-serif font-semibold text-[#1A3A52] mb-3">
                  {specialty.title}
                </h3>

                <p className="mb-5 text-[#6B7280] leading-relaxed">{specialty.description}</p>

                <div className="mt-auto border-t border-[rgba(26,58,82,0.08)] pt-4">
                  <ul className="space-y-2.5">
                    {specialty.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2 text-sm text-[#6B7280]">
                        <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C9A962]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
