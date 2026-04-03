import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

// Hero entrance animation
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

// Hero image parallax
const heroImage = document.querySelector('#hero-image')
const heroAshi = document.querySelector('#hero-ashi')
if (heroImage) {
  const heroScrollTrigger: ScrollTrigger.Vars = {
    trigger: 'header',
    start: 'clamp(top 10%)',
    end: 'clamp(bottom top)',
    scrub: true,
  }

  gsap.fromTo(
    heroImage,
    { yPercent: -12 },
    { yPercent: 12, ease: 'power2.inOut', scrollTrigger: heroScrollTrigger }
  )

  if (heroAshi) {
    gsap.fromTo(
      heroAshi,
      { y: '1rem', scale: 1 },
      {
        y: '-1rem',
        scale: 1.05,
        ease: 'power2.inOut',
        scrollTrigger: heroScrollTrigger,
      }
    )
  }
}

// Why Us image parallax
const whyUsImage = document.querySelector('#why-us-image')
if (whyUsImage) {
  gsap.fromTo(
    whyUsImage,
    { yPercent: -12 },
    {
      yPercent: 12,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '#why-us',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    }
  )
}
