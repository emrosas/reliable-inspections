// @ts-check
import { defineConfig, fontProviders } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'
import svelte from '@astrojs/svelte'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  // Update this to your production domain when you go live
  site: 'https://reliable-inspections-y8i9r.sevalla.page',
  integrations: [svelte(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Geist',
      cssVariable: '--font-geist',
      weights: [400, 500, 600, 700],
    },
  ],
})
