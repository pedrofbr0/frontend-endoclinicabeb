import {createClient} from '@sanity/client'
import {NextResponse} from 'next/server'
import {SANITY_API_VERSION, SANITY_DATASET, SANITY_PROJECT_ID} from '../../../lib/sanity'

interface ContactPayload {
  name?: string
  email?: string
  phone?: string
  message?: string
  website?: string
}

function sanitizeText(value: unknown, maxLength: number) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, maxLength)
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  const token = process.env.SANITY_API_WRITE_TOKEN

  if (!token) {
    return NextResponse.json(
      {
        message: 'O servidor nao possui token para gravar os contatos no Sanity.',
        code: 'missing_token',
      },
      {status: 503},
    )
  }

  let payload: ContactPayload

  try {
    payload = (await request.json()) as ContactPayload
  } catch {
    return NextResponse.json({message: 'Requisicao invalida.'}, {status: 400})
  }

  const website = sanitizeText(payload.website, 120)

  if (website) {
    return NextResponse.json({ok: true})
  }

  const name = sanitizeText(payload.name, 120)
  const email = sanitizeText(payload.email, 160).toLowerCase()
  const phone = sanitizeText(payload.phone, 40)
  const message = sanitizeText(payload.message, 2000)

  if (!name || !email || !phone || !message) {
    return NextResponse.json(
      {message: 'Preencha nome, e-mail, telefone e mensagem.'},
      {status: 400},
    )
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({message: 'Informe um e-mail valido.'}, {status: 400})
  }

  const writeClient = createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    apiVersion: SANITY_API_VERSION,
    token,
    useCdn: false,
  })

  try {
    await writeClient.create({
      _type: 'clienteContato',
      nome: name,
      email,
      telefone: phone,
      telefoneNormalizado: phone.replace(/\D/g, ''),
      mensagem: message,
      origem: 'Formulario do site',
      status: 'Novo',
      dataContato: new Date().toISOString(),
    })

    return NextResponse.json({ok: true})
  } catch (error) {
    console.error('Failed to save contact in Sanity:', error)
    return NextResponse.json(
      {message: 'Nao foi possivel registrar seu contato agora.'},
      {status: 500},
    )
  }
}
