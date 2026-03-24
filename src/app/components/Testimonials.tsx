import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Carlos Mendes',
    age: '52 anos',
    condition: 'Diabetes Tipo 2',
    text: 'O atendimento é excepcional. A Dra. Maria me ajudou a controlar minha diabetes de forma eficaz. Hoje tenho muito mais qualidade de vida e energia.',
    rating: 5,
  },
  {
    name: 'Juliana Oliveira',
    age: '38 anos',
    condition: 'Hipotireoidismo',
    text: 'Profissionais extremamente atenciosos e competentes. Finalmente consegui o tratamento adequado para minha tireoide e voltei a me sentir bem.',
    rating: 5,
  },
  {
    name: 'Roberto Silva',
    age: '45 anos',
    condition: 'Emagrecimento',
    text: 'A abordagem personalizada fez toda a diferença. Perdi 25kg de forma saudável e sustentável. Muito obrigado pela dedicação!',
    rating: 5,
  },
  {
    name: 'Marina Santos',
    age: '41 anos',
    condition: 'Reposição Hormonal',
    text: 'Excelente acompanhamento durante todo o processo. Os médicos realmente se importam com o bem-estar dos pacientes.',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#FAFAF8] to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#C9A962] text-sm font-semibold tracking-wider uppercase">Depoimentos</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1A3A52] mb-6">
            O Que Nossos Pacientes Dizem
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            A confiança e satisfação dos nossos pacientes são o nosso maior orgulho e motivação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 md:p-8 rounded-2xl border border-[rgba(26,58,82,0.08)] hover:border-[#C9A962]/30 hover:shadow-xl transition-all duration-300 relative"
            >
              <Quote className="w-10 h-10 text-[#C9A962]/20 absolute top-6 right-6" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C9A962] text-[#C9A962]" />
                ))}
              </div>
              
              <p className="text-[#6B7280] leading-relaxed mb-6 relative z-10 text-sm md:text-base">
                "{testimonial.text}"
              </p>
              
              <div className="pt-4 border-t border-[rgba(26,58,82,0.08)]">
                <p className="font-semibold text-[#1A3A52]">{testimonial.name}</p>
                <p className="text-sm text-[#C9A962]">{testimonial.age}</p>
                <p className="text-xs text-[#6B7280] mt-1">{testimonial.condition}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-block bg-white rounded-2xl border border-[rgba(26,58,82,0.08)] px-8 py-6 shadow-lg">
            <p className="text-sm text-[#6B7280] mb-3">Avaliação média dos nossos pacientes</p>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-[#C9A962] text-[#C9A962]" />
                ))}
              </div>
              <span className="text-3xl font-serif font-bold text-[#1A3A52]">5.0</span>
            </div>
            <p className="text-xs text-[#6B7280]">Baseado em mais de 500 avaliações verificadas</p>
          </div>
        </div>
      </div>
    </section>
  );
}
