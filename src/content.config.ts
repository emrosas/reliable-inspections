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

const inspectionSchema = ({ image }: { image: Function }) =>
  z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    extraTitle: z.string().optional(),
    extraItems: z.array(z.string()).optional(),
    extraDescription: z.string().optional(),
    bestFor: z.string().optional(),
    whenToConsider: z.array(z.string()).optional(),
    image: image().optional(),
  })

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: inspectionSchema,
})

const addons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/addons' }),
  schema: inspectionSchema,
})

export const collections = { blog, services, addons }
