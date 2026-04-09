import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { file, glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      readTime: z.string(),
      image: image(),
      imageAlt: z.string(),
    }),
})

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image().optional(),
    }),
})

export const collections = { blog, services }
