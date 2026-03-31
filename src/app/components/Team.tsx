import {Award, Briefcase, GraduationCap} from 'lucide-react'
import {getSanityImageUrl, type DoctorProfile} from '../../lib/sanity'

interface TeamProps {
  doctorProfiles: DoctorProfile[]
}

export function Team({doctorProfiles}: TeamProps) {
  return (
    <section id="equipe" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#C9A962] text-sm font-semibold tracking-wider uppercase">
              Nossa Equipe
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1A3A52] mb-6">
            Conheça os Especialistas
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            Médicos endocrinologistas com formação nas melhores instituições do país, dedicados ao
            seu bem-estar.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {doctorProfiles.map((doctorProfile) => {
            const cardImageSource = doctorProfile.cardImage || doctorProfile.image
            const desktopImageUrl = getSanityImageUrl(cardImageSource, {
              width: 1600,
              height: 1000,
              fit: 'crop',
            })
            const mobileImageUrl = getSanityImageUrl(cardImageSource, {
              width: 1200,
              height: 900,
              fit: 'crop',
            })
            const imageUrl = desktopImageUrl || mobileImageUrl

            return (
              <article
                key={`${doctorProfile.name}-${doctorProfile.licenseNumber}`}
                className="bg-[#FAFAF8] rounded-2xl overflow-hidden border border-[rgba(26,58,82,0.08)] hover:border-[#C9A962]/30 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden aspect-[4/3] sm:aspect-[16/10]">
                  {imageUrl ? (
                    <picture className="block w-full h-full">
                      {mobileImageUrl ? (
                        <source media="(max-width: 639px)" srcSet={mobileImageUrl} />
                      ) : null}
                      <img
                        src={imageUrl}
                        alt={`${doctorProfile.name} - ${doctorProfile.specialty}`}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                        style={{objectFit: 'cover'}}
                      />
                    </picture>
                  ) : (
                    <div className="w-full h-full bg-slate-200 animate-pulse" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A3A52]/90 via-[#1A3A52]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-1.5 sm:mb-2 leading-tight">
                      {doctorProfile.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[#C9A962] mb-1.5 sm:mb-2">
                      <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="text-[13px] sm:text-sm font-semibold">
                        {doctorProfile.licenseNumber}
                      </span>
                    </div>
                    <p className="text-white/90 text-[13px] sm:text-sm">{doctorProfile.specialty}</p>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#E3D5B7]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#C9A962]" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#C9A962] uppercase tracking-wide mb-1">
                          Formação
                        </p>
                        <p className="text-[#2C3E50] font-medium">{doctorProfile.education}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#E3D5B7]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#C9A962]" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#C9A962] uppercase tracking-wide mb-1">
                          Residência em Clínica Médica
                        </p>
                        <p className="text-[#2C3E50] font-medium">
                          {doctorProfile.clinicalResidency}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#E3D5B7]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#C9A962]" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#C9A962] uppercase tracking-wide mb-1">
                          Residência em Endocrinologia
                        </p>
                        <p className="text-[#2C3E50] font-medium">
                          {doctorProfile.endocrinologyResidency}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
