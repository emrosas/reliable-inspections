// document.addEventListener('DOMContentLoaded', () => {
//   const menu = document.querySelector('#menu') as HTMLElement
//   const menuButton = document.querySelector('#menu-button') as HTMLButtonElement

//   function toggleMenu() {
//     const isOpen = menuButton.getAttribute('aria-expanded') === 'true'
//     menuButton.setAttribute('aria-expanded', isOpen ? 'false' : 'true')
//     menu.setAttribute('data-open', isOpen ? 'false' : 'true')
//   }

//   menuButton.addEventListener('click', () => {
//     toggleMenu()
//   })
// })

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// FAQ accordion
document.querySelectorAll<HTMLDetailsElement>('details.group').forEach((details) => {
  const summary = details.querySelector<HTMLElement>('summary')!
  const content = details.querySelector<HTMLElement>(':scope > p')!

  // Wrap answer in a div so we can animate its height
  const wrapper = document.createElement('div')
  wrapper.style.overflow = 'hidden'
  content.parentNode!.insertBefore(wrapper, content)
  wrapper.appendChild(content)
  gsap.set(wrapper, { height: 0 })

  summary.addEventListener('click', (e) => {
    e.preventDefault()

    if (details.open) {
      gsap.to(wrapper, {
        height: 0,
        duration: 0.35,
        ease: 'power2.inOut',
        onComplete: () => details.removeAttribute('open'),
      })
    } else {
      details.setAttribute('open', '')
      const targetHeight =
        content.offsetHeight +
        parseFloat(getComputedStyle(content).marginTop)
      gsap.fromTo(
        wrapper,
        { height: 0 },
        {
          height: targetHeight,
          duration: 0.35,
          ease: 'power2.inOut',
          onComplete: () => gsap.set(wrapper, { height: 'auto' }),
        }
      )
    }
  })
})

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
