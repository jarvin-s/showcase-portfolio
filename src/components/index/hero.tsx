'use client'

import { Anton } from 'next/font/google'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'

const anton = Anton({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-anton',
})

export default function Hero() {
    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const animationRef = useRef<gsap.Context | null>(null)

    useEffect(() => {
        if (animationRef.current) {
            animationRef.current.kill()
        }

        animationRef.current = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    animationRef.current = null
                },
            })

            tl.fromTo(
                firstNameRef.current,
                {
                    opacity: 0,
                    x: -200,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 2.5,
                    ease: 'power4.out',
                    delay: 0.4,
                }
            )

            tl.fromTo(
                lastNameRef.current,
                {
                    opacity: 0,
                    x: 200,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.5,
                    ease: 'power4.out',
                },
                '<'
            )
        })

        return () => {
            if (animationRef.current) {
                animationRef.current.kill()
            }
        }
    }, [])

    return (
        <div className='relative h-screen'>
            <div className='z-10 flex h-full w-full flex-col items-center justify-center'>
                <div
                    className={`text-primary relative text-[20vw] font-bold ${anton.className} flex flex-col items-center justify-center text-center leading-[0.88] uppercase`}
                >
                    <span ref={firstNameRef}>Jarvin</span>
                    <span ref={lastNameRef}>Siegers</span>
                </div>
            </div>
        </div>
    )
}
