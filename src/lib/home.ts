import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
