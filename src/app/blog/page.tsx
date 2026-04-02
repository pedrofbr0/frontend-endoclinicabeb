import type {Metadata} from 'next'
import {BlogListClient} from '../components/BlogListClient'
import {getAllPosts} from '../../lib/sanity.server'
import {buildAbsoluteUrl} from '../../lib/sanity'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Leia os artigos da EndoClinica B&B sobre endocrinologia, metabolismo, qualidade de vida e bem-estar.',
  alternates: {
    canonical: buildAbsoluteUrl('/blog'),
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  return <BlogListClient posts={posts} />
}
