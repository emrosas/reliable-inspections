import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Preset = { from: gsap.TweenVars; to: gsap.TweenVars }

const presets: Record<string, Preset> = {
  'fade-up':    { from: { y: 30, autoAlpha: 0 }, to: { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' } },
  'fade-in':    { from: { autoAlpha: 0 },         to: { autoAlpha: 1,       duration: 0.6, ease: 'power3.out' } },
  'fade-left':  { from: { x: -30, autoAlpha: 0 }, to: { x: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' } },
  'fade-right': { from: { x: 30, autoAlpha: 0 },  to: { x: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' } },
}

function getPreset(name: string | undefined): Preset {
  return presets[name ?? 'fade-up'] ?? presets['fade-up']
}

// [data-animate] — single elements, batched per preset for performance
const animateEls = document.querySelectorAll<HTMLElement>('[data-animate]')
if (animateEls.length) {
  const groups = new Map<string, HTMLElement[]>()

  animateEls.forEach((el) => {
    const key = el.dataset.animate || 'fade-up'
if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(el)
  })

  groups.forEach((els, key) => {
    const { from, to } = getPreset(key)
    gsap.set(els, from)
    ScrollTrigger.batch(els, {
      onEnter: (batch) => gsap.to(batch, to),
      start: 'top 66%',
      once: true,
    })
  })
}

// [data-animate-stagger] — children of a container stagger in together
document.querySelectorAll<HTMLElement>('[data-animate-stagger]').forEach((container) => {
  const { from, to } = getPreset(container.dataset.animateStagger)
  const children = Array.from(container.children) as HTMLElement[]
  if (!children.length) return

  gsap.set(children, from)
  ScrollTrigger.create({
    trigger: container,
    start: 'top 66%',
    once: true,
    onEnter: () => gsap.to(children, { ...to, stagger: 0.1 }),
  })
})
