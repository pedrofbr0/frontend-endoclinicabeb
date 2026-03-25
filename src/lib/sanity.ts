import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'olc9cotp',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-03-24',
})