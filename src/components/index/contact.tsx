'use client'

import React, { useEffect } from 'react'
import { Anton } from 'next/font/google'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const anton = Anton({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-anton',
})

const Contact = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const lines = gsap.utils.toArray<HTMLElement>('.contact-fill')
        lines.forEach((line) => {
            const fill = line.querySelector<HTMLElement>('.fill')
            if (!fill) return
            gsap.fromTo(
                fill,
                { clipPath: 'inset(0% 0% 100% 0%)' },
                {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: line,
                        start: 'top 100%',
                        end: 'top 60%',
                        scrub: true,
                    },
                }
            )
        })
    }, [])

    return (
        <div className='flex h-screen w-full flex-col items-center justify-center'>
            <div className='contact-fill relative'>
                <h1
                    className={`outline-text text-center text-[12vw] font-bold uppercase md:text-[8.5vw] ${anton.className}`}
                >
                    Let&apos;s chat!
                </h1>
                <h1
                    aria-hidden='true'
                    className={`fill pointer-events-none absolute inset-0 text-center text-[12vw] font-bold uppercase md:text-[8.5vw] ${anton.className} text-primary`}
                >
                    Let&apos;s chat!
                </h1>
            </div>

            <div className='contact-fill relative mt-2'>
                <h2
                    className={`outline-text ${anton.className} text-center text-[8vw] font-bold uppercase md:text-[5vw]`}
                >
                    <Link
                        href='mailto:jarvin.siegers@gmail.com'
                        target='_blank'
                        className='underline'
                    >
                        jarvin.siegers@gmail.com
                    </Link>
                </h2>
                <h2
                    aria-hidden='true'
                    className={`fill pointer-events-none absolute inset-0 text-center text-[8vw] font-bold uppercase md:text-[5vw] ${anton.className} text-primary`}
                >
                    jarvin.siegers@gmail.com
                </h2>
            </div>

            <div className='contact-fill relative mt-2'>
                <h2
                    className={`outline-text ${anton.className} text-center text-[8vw] font-bold uppercase md:text-[5vw]`}
                >
                    Connect with me on{' '}
                    <Link
                        href='https://www.linkedin.com/in/jarvin-siegers/'
                        target='_blank'
                        className='underline'
                    >
                        LinkedIn
                    </Link>
                </h2>
                <h2
                    aria-hidden='true'
                    className={`fill pointer-events-none absolute inset-0 text-center text-[8vw] font-bold uppercase md:text-[5vw] ${anton.className} text-primary`}
                >
                    Connect with me on LinkedIn
                </h2>
            </div>
        </div>
    )
}

export default Contact
