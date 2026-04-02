import type {MetadataRoute} from 'next'
import {getAllPosts} from '../lib/sanity.server'
import {buildAbsoluteUrl} from '../lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: buildAbsoluteUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: buildAbsoluteUrl('/blog'),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: buildAbsoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...postRoutes]
}
