import { GraduationCap, Award, Briefcase } from "lucide-react";
import drRuiImage from "../../assets/9baa44d9f592738b6002929c2e0a8829051eed52.png";
import drYuriImage from "../../assets/c24300abed7a6ac555337b10631cacf6fae00499.png";

const team = [
  {
    name: "Dr. Rui Barbosa",
    crm: "CRM/MG 70638",
    specialty: "Endocrinologia e Metabologia",
    education: "Universidade de Uberaba (Uniube)",
    residency_clinica: "Fundação Santa Casa de Misericórdia de Franca",
    residency_endo: "Universidade Federal do Triângulo Mineiro (UFTM)",
    image: drRuiImage,
    customImageStyle: { 
      transform: 'scale(1.35) translateX(-13%)', 
      objectPosition: 'center 15%',
    },
  },
  {
    name: "Dr. Yuri Bittencourt",
    crm: "CRM/MG 86135",
    specialty: "Endocrinologia e Metabologia",
    education: "Universidade de Uberaba (Uniube)",
    residency_clinica: "Universidade Federal de Uberlândia (UFU)",
    residency_endo: "Universidade Federal do Triângulo Mineiro (UFTM)",
    image: drYuriImage,
    customImageStyle: {
      objectPosition: 'center 7%'  
    },
  },
];

export function Team() {
  return (
    <section id="equipe" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#C9A962] text-sm font-semibold tracking-wider uppercase">Nossa Equipe</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1A3A52] mb-6">
            Conheça os Especialistas
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            Médicos endocrinologistas com formação nas melhores instituições do país, dedicados ao seu bem-estar.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {team.map((doctor, index) => (
            <article
              key={index}
              className="bg-[#FAFAF8] rounded-2xl overflow-hidden border border-[rgba(26,58,82,0.08)] hover:border-[#C9A962]/30 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden h-80 md:h-96">
                <img
                  src={doctor.image}
                  alt={`${doctor.name} - ${doctor.specialty}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ objectFit: 'cover', ...doctor.customImageStyle }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A3A52]/90 via-[#1A3A52]/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-3xl font-serif font-bold text-white mb-2">
                    {doctor.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[#C9A962] mb-2">
                    <Award className="w-4 h-4" />
                    <span className="text-sm font-semibold">{doctor.crm}</span>
                  </div>
                  <p className="text-white/90 text-sm">{doctor.specialty}</p>
                </div>
              </div>

              <div className="p-8">
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#E3D5B7]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-[#C9A962]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#C9A962] uppercase tracking-wide mb-1">Formação</p>
                      <p className="text-[#2C3E50] font-medium">{doctor.education}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#E3D5B7]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-[#C9A962]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#C9A962] uppercase tracking-wide mb-1">Residência em Clínica Médica</p>
                      <p className="text-[#2C3E50] font-medium">{doctor.residency_clinica}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#E3D5B7]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-[#C9A962]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#C9A962] uppercase tracking-wide mb-1">Residência em Endocrinologia</p>
                      <p className="text-[#2C3E50] font-medium">{doctor.residency_endo}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
