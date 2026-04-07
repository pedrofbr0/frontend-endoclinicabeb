import {revalidatePath} from 'next/cache'
import {type NextRequest, NextResponse} from 'next/server'

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET

  if (!secret) {
    return NextResponse.json(
      {message: 'Segredo de revalidação não configurado no servidor.'},
      {status: 500},
    )
  }

  const authHeader = request.headers.get('authorization')
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token || token !== secret) {
    return NextResponse.json({message: 'Não autorizado.'}, {status: 401})
  }

  revalidatePath('/', 'layout')

  return NextResponse.json({revalidated: true, timestamp: new Date().toISOString()})
}
