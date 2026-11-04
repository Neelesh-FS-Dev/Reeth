import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugins once for the whole app.
gsap.registerPlugin(ScrollTrigger)
gsap.defaults({ ease: 'power3.out', duration: 0.9 })
// Lenis drives the frame clock; lag smoothing would fight it.
gsap.ticker.lagSmoothing(0)

export { gsap, ScrollTrigger }
