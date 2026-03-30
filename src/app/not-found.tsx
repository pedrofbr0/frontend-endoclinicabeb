import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] pt-40 pb-24">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <span className="text-[#C9A962] text-sm font-semibold tracking-wider uppercase">404</span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A3A52] mt-4 mb-6">
          Conteudo nao encontrado
        </h1>
        <p className="text-lg text-[#6B7280] mb-10">
          O link pode estar desatualizado ou o artigo nao esta mais disponivel.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/blog"
            className="bg-[#1A3A52] text-white px-8 py-4 rounded-xl hover:bg-[#0F2333] transition-all font-semibold"
          >
            Voltar para o blog
          </Link>
          <Link
            href="/"
            className="border border-[#1A3A52] text-[#1A3A52] px-8 py-4 rounded-xl hover:bg-[#1A3A52] hover:text-white transition-all font-semibold"
          >
            Ir para a home
          </Link>
        </div>
      </div>
    </main>
  )
}
