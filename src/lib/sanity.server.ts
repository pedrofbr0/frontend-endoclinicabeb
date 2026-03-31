import {cache} from 'react'
import {
  mapBlogPost,
  sanityClient,
  sortPostsByDisplayDate,
  type BlogPostDetail,
  type BlogPostSummary,
  type ContactInfo,
  type DoctorProfile,
  type SanityPostRecord,
  type SiteConfigData,
} from './sanity'

const contactInfoQuery = `*[_type == "contato"][0]{
  "phone": telefone,
  email,
  "street": logradouro,
  "number": numero,
  "neighborhood": bairro,
  "city": cidade,
  "state": estado,
  "zipCode": cep,
  "complement": complemento,
  instagram,
  facebook,
  linkedin,
  "businessHours": horarios[]{
    _key,
    "day": dia,
    "hours": horas
  }
}`

const imageProjection = `{
  asset,
  crop,
  hotspot,
  alt
}`

const doctorProfilesQuery = `*[_type == "informacoesMedicos"] | order(_createdAt asc){
  "name": nome,
  "licenseNumber": crm,
  "specialty": coalesce(especialidade, "Endocrinologia e Metabologia"),
  "education": coalesce(formacao, "Universidade de Uberaba (Uniube)"),
  "clinicalResidency": residencyClinica,
  "endocrinologyResidency": residencyEndo,
  "cardImage": coalesce(imagemCard${imageProjection}, imagem${imageProjection}),
  "image": imagem${imageProjection}
}`

const siteSettingsQuery = `*[_type == "configuracoesSite"][0]{
  "logo": logo${imageProjection},
  "favicon": favicon${imageProjection},
  "heroImage": heroImage${imageProjection}
}`

const postProjection = `
  _id,
  "title": titulo,
  "slug": slug.current,
  "author": autor,
  "showOnFrontend": coalesce(showOnFrontend, true),
  _createdAt,
  "useRealDate": usarDataReal,
  "displayDate": dataExibicao,
  "hideAuthor": hideAuthor,
  "hideDate": hideDate,
  "coverImage": imagemCapa${imageProjection},
  "cardImage": coalesce(imagemCard${imageProjection}, imagemCapa${imageProjection}),
  "excerpt": pt::text(conteudo)
`

const postsQuery = `*[_type == "post" && defined(slug.current) && coalesce(showOnFrontend, true) == true]{${postProjection}}`
const postBySlugQuery = `*[_type == "post" && slug.current == $slug && coalesce(showOnFrontend, true) == true][0]{${postProjection}, "content": conteudo}`
const postCountQuery = `count(*[_type == "post" && defined(slug.current) && coalesce(showOnFrontend, true) == true])`

export const getContactInfo = cache(async () => {
  return sanityClient.fetch<ContactInfo | null>(contactInfoQuery)
})

export const getDoctorProfiles = cache(async () => {
  return sanityClient.fetch<DoctorProfile[]>(doctorProfilesQuery)
})

export const getSiteSettings = cache(async () => {
  return sanityClient.fetch<SiteConfigData | null>(siteSettingsQuery)
})

export const getPostCount = cache(async () => {
  return sanityClient.fetch<number>(postCountQuery)
})

export const getAllPosts = cache(async () => {
  const posts = await sanityClient.fetch<SanityPostRecord[]>(postsQuery)
  return sortPostsByDisplayDate(posts.map(mapBlogPost))
})

export async function getLatestPosts(limit = 3) {
  const posts = await getAllPosts()
  return posts.slice(0, limit)
}

export const getPostBySlug = cache(async (slug: string) => {
  const post = await sanityClient.fetch<SanityPostRecord | null>(postBySlugQuery, {slug})

  if (!post) {
    return null
  }

  const mappedPost: BlogPostDetail = {
    ...mapBlogPost(post),
    content: Array.isArray(post.content) ? post.content : [],
  }

  return mappedPost
})

export const getSiteShellData = cache(async () => {
  const [contactInfo, siteSettings, postCount] = await Promise.all([
    getContactInfo(),
    getSiteSettings(),
    getPostCount(),
  ])
  const resolvedSiteSettings: SiteConfigData = siteSettings || {}

  return {
    contactInfo,
    siteSettings: resolvedSiteSettings,
    hasBlogPosts: postCount > 0,
  }
})
