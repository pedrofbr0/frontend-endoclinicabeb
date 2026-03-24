import { Microscope, Cpu, HeartHandshake } from 'lucide-react';

const values = [
  {
    icon: Microscope,
    title: 'Rigor Científico',
    description: 'Tratamentos baseados nas mais recentes evidências científicas e diretrizes internacionais de endocrinologia.',
  },
  {
    icon: Cpu,
    title: 'Tecnologia Avançada',
    description: 'Equipamentos de última geração para diagnósticos precisos e monitoramento contínuo da sua saúde.',
  },
  {
    icon: HeartHandshake,
    title: 'Acompanhamento Próximo',
    description: 'Atendimento humanizado com tempo dedicado para cada paciente, construindo uma relação de confiança.',
  },
];

export function ValueProposition() {
  return (
    <section id="diferenciais" className="py-20 md:py-28 bg-white relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjQzlBOTYyIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9zdmc+')] opacity-40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#C9A962] text-sm font-semibold tracking-wider uppercase">Nossos Diferenciais</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1A3A52] mb-6">
            Uma abordagem 360º para a sua saúde
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            Combinamos expertise clínica, tecnologia de ponta e cuidado individualizado para transformar sua qualidade de vida.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-[#FAFAF8] p-8 md:p-10 rounded-2xl border border-[rgba(26,58,82,0.08)] hover:border-[#C9A962]/30 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#C9A962] to-[#A08847] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-semibold text-[#1A3A52] mb-4">
                  {value.title}
                </h3>
                <p className="text-[#6B7280] leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
