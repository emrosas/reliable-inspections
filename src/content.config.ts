import { defineCollection, z } from 'astro:content'
import { file, glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    readTime: z.string(),
  }),
})

const services = defineCollection({
  loader: file('src/content/services.json'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
  }),
})

export const collections = { blog, services }
