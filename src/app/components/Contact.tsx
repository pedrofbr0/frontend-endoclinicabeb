'use client'

import type {ChangeEvent, FormEvent} from 'react'
import {useState} from 'react'
import {Clock, Facebook, Instagram, Linkedin, MapPin, Phone} from 'lucide-react'
import type {ContactInfo} from '../../lib/sanity'

interface ContactProps {
  contactInfo: ContactInfo | null
}

interface ContactFormState {
  name: string
  email: string
  phone: string
  message: string
  website: string
}

interface ContactApiResponse {
  message?: string
  code?: string
}

const initialFormState: ContactFormState = {
  name: '',
  email: '',
  phone: '',
  message: '',
  website: '',
}

const quickMessage = 'Ola! Gostaria de agendar uma avaliacao personalizada.'

function normalizeField(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

function buildWhatsAppMessage(formState: ContactFormState) {
  return [
    'Ola! Gostaria de agendar uma avaliacao personalizada.',
    '',
    `Nome: ${normalizeField(formState.name)}`,
    `E-mail: ${normalizeField(formState.email)}`,
    `Telefone: ${normalizeField(formState.phone)}`,
    `Mensagem: ${normalizeField(formState.message)}`,
  ].join('\n')
}

export function Contact({contactInfo}: ContactProps) {
  const [formState, setFormState] = useState(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{
    type: 'idle' | 'success' | 'warning' | 'error'
    message: string
  }>({type: 'idle', message: ''})

  const whatsappNumber = contactInfo?.phone?.replace(/\D/g, '') || ''
  const addressLine = [contactInfo?.street, contactInfo?.number].filter(Boolean).join(', ')
  const regionLine = [contactInfo?.neighborhood, contactInfo?.city, contactInfo?.state]
    .filter(Boolean)
    .join(' - ')

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = event.target
    setFormState((current) => ({...current, [name]: value}))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({type: 'idle', message: ''})

    const payload = {
      ...formState,
      name: normalizeField(formState.name),
      email: normalizeField(formState.email),
      phone: normalizeField(formState.phone),
      message: normalizeField(formState.message),
    }

    const whatsappUrl = whatsappNumber
      ? `https://wa.me/55${whatsappNumber}?text=${encodeURIComponent(buildWhatsAppMessage(payload))}`
      : ''

    if (whatsappUrl) {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const responseData = (await response.json().catch(() => null)) as ContactApiResponse | null

      if (!response.ok) {
        const responseMessage =
          responseData?.message || 'Nao foi possivel registrar seu contato agora.'

        if (whatsappUrl) {
          setStatus({
            type: 'warning',
            message:
              responseData?.code === 'missing_token'
                ? 'Mensagem aberta no WhatsApp. Falta apenas configurar o token da API do Sanity para salvar os contatos automaticamente.'
                : `Mensagem aberta no WhatsApp, mas houve uma falha ao salvar o contato no site: ${responseMessage}`,
          })
          return
        }

        throw new Error(responseMessage)
      }

      setFormState(initialFormState)
      setStatus({
        type: 'success',
        message: whatsappUrl
          ? 'Mensagem aberta no WhatsApp e contato salvo com sucesso.'
          : 'Contato enviado com sucesso. Em breve entraremos em contato.',
      })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Nao foi possivel registrar seu contato.'

      setStatus({
        type: 'error',
        message,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contato" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#C9A962] text-sm font-semibold tracking-wider uppercase">
              Contato
            </span>
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
              {addressLine || regionLine || contactInfo?.zipCode ? (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C9A962] to-[#A08847] text-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1A3A52] mb-2">Endereço da Clínica</h4>
                    <address className="text-[#6B7280] not-italic leading-relaxed">
                      {addressLine ? (
                        <>
                          {addressLine}
                          <br />
                        </>
                      ) : null}
                      {contactInfo?.complement ? (
                        <>
                          {contactInfo.complement}
                          <br />
                        </>
                      ) : null}
                      {regionLine ? (
                        <>
                          {regionLine}
                          <br />
                        </>
                      ) : null}
                      {contactInfo?.zipCode ? <>CEP: {contactInfo.zipCode}</> : null}
                    </address>
                  </div>
                </div>
              ) : null}

              {contactInfo?.phone ? (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C9A962] to-[#A08847] text-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1A3A52] mb-2">Telefone e WhatsApp</h4>
                    <p className="text-[#6B7280]">
                      <a
                        href={`https://wa.me/55${whatsappNumber}?text=${encodeURIComponent(quickMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#C9A962] transition-colors block"
                      >
                        {contactInfo.phone}
                      </a>
                    </p>
                    {contactInfo.email ? (
                      <p className="text-[#6B7280] mt-2">
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className="hover:text-[#C9A962] transition-colors"
                        >
                          {contactInfo.email}
                        </a>
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {contactInfo?.businessHours?.length ? (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C9A962] to-[#A08847] text-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1A3A52] mb-2">Horários de Atendimento</h4>
                    <p className="text-[#6B7280] leading-relaxed">
                      {contactInfo.businessHours.map((businessHour) => (
                        <span key={businessHour._key} className="block">
                          {businessHour.day}: {businessHour.hours}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            {contactInfo?.instagram || contactInfo?.facebook || contactInfo?.linkedin ? (
              <div className="mt-8 pt-8 border-t border-[rgba(26,58,82,0.08)]">
                <h4 className="font-semibold text-[#1A3A52] mb-4">Redes Sociais</h4>
                <div className="flex gap-3">
                  {contactInfo.instagram ? (
                    <a
                      href={contactInfo.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 bg-[#E3D5B7]/30 rounded-lg flex items-center justify-center hover:bg-[#C9A962] hover:text-white transition-all"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  ) : null}
                  {contactInfo.facebook ? (
                    <a
                      href={contactInfo.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 bg-[#E3D5B7]/30 rounded-lg flex items-center justify-center hover:bg-[#C9A962] hover:text-white transition-all"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  ) : null}
                  {contactInfo.linkedin ? (
                    <a
                      href={contactInfo.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 bg-[#E3D5B7]/30 rounded-lg flex items-center justify-center hover:bg-[#C9A962] hover:text-white transition-all"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          <div>
            <div className="bg-[#FAFAF8] p-8 md:p-10 rounded-2xl border border-[rgba(26,58,82,0.08)]">
              <h3 className="text-2xl font-serif font-bold text-[#1A3A52] mb-6">
                Envie uma Mensagem
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="hidden">
                  <label htmlFor="website">Não preencha este campo</label>
                  <input
                    id="website"
                    name="website"
                    value={formState.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label htmlFor="name" className="block text-[#1A3A52] font-semibold mb-2 text-sm">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    id="name"
                    className="w-full px-4 py-3.5 bg-white border border-[rgba(26,58,82,0.1)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A962] transition-all"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[#1A3A52] font-semibold mb-2 text-sm">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    id="email"
                    className="w-full px-4 py-3.5 bg-white border border-[rgba(26,58,82,0.1)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A962] transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[#1A3A52] font-semibold mb-2 text-sm">
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    required
                    id="phone"
                    className="w-full px-4 py-3.5 bg-white border border-[rgba(26,58,82,0.1)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A962] transition-all"
                    placeholder="(34) 99999-9999"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[#1A3A52] font-semibold mb-2 text-sm">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3.5 bg-white border border-[rgba(26,58,82,0.1)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A962] transition-all resize-none"
                    placeholder="Como podemos ajudá-lo?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#C9A962] text-[#1A3A52] px-8 py-4 rounded-xl hover:bg-[#A08847] transition-all font-semibold shadow-lg hover:shadow-xl min-h-[54px] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                </button>

                <div aria-live="polite" className="min-h-6">
                  {status.message ? (
                    <p
                      className={`text-sm text-center ${
                        status.type === 'success'
                          ? 'text-emerald-700'
                          : status.type === 'warning'
                            ? 'text-amber-700'
                            : 'text-rose-700'
                      }`}
                    >
                      {status.message}
                    </p>
                  ) : (
                    <p className="text-xs text-[#6B7280] text-center">
                      Responderemos em até 24 horas úteis
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-xl h-96 border border-[rgba(26,58,82,0.08)]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3755.0447912826357!2d-47.9221599!3d-19.753251499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94bad0278cab06bd%3A0x43e3e0b49384efd8!2sAv.%20Leopoldino%20de%20Oliveira%2C%202025%20-%20Estados%20Unidos%2C%20Uberaba%20-%20MG%2C%2038026-435!5e0!3m2!1spt-BR!2sbr!4v1774419647264!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{border: 0}}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localizacao da EndoClinica B&B"
          />
        </div>
      </div>
    </section>
  )
}
