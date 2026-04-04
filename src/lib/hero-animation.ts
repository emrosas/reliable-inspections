import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

const heroContent = document.querySelector('#hero-content')
if (heroContent) {
  SplitText.create('#hero-title', {
    type: 'lines',
    onSplit(titleSplit) {
      const tl = gsap.timeline()

      // Left column — continuous flow, each element overlaps the previous
      tl.from('#hero-content > :first-child', {
        y: 20, autoAlpha: 0, duration: 0.6, ease: 'power3.out',
      })

      tl.from(titleSplit.lines, {
        y: 20, autoAlpha: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
      }, '-=0.45')

      SplitText.create('#hero-paragraph', {
        type: 'lines',
        onSplit(paraSplit) {
          tl.from(paraSplit.lines, {
            y: 20, autoAlpha: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08,
            onComplete: () => paraSplit.revert(),
          }, '-=0.5')
        },
      })

      tl.from('#hero-content > div', {
        y: 20, autoAlpha: 0, duration: 0.6, ease: 'power3.out',
      }, '-=0.45')

      // #hero-ashi is optional — GSAP skips gracefully if element is absent
      tl.from('#hero-ashi', {
        y: 16, autoAlpha: 0, duration: 0.5, ease: 'power3.out',
      }, '-=0.35')

      // Image — inserted last with explicit position so it never affects the chain above
      tl.fromTo(
        '#hero-image-container',
        { clipPath: 'inset(50% 0% 50% 0% round 1rem)' },
        { clipPath: 'inset(0% 0% 0% 0% round 1rem)', duration: 1.4, ease: 'power3.inOut' },
        0.2
      )

      tl.then(() => titleSplit.revert())

      return tl
    },
  })
}
