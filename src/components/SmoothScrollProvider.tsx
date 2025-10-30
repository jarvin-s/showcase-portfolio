'use client'

import { ReactNode, useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface SmoothScrollProviderProps {
    children: ReactNode
}

const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        })

        gsap.registerPlugin(ScrollTrigger)

        lenis.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })
        console.log('lenis', lenis)

        return () => {
            lenis.destroy()
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000)
            })
        }
    }, [])

    return <>{children}</>
}

export default SmoothScrollProvider
