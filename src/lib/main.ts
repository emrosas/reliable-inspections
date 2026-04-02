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
