'use client'

import { Anton } from 'next/font/google'
import projects from '@/lib/projects.json'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { slugify } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type Project = {
    title: string
    description: string
    image: string
    link: string
    tags: string[]
}

const anton = Anton({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-anton',
})

const Curious = () => {
    const router = useRouter()
    const fixedPositions: Array<Record<string, string>> = [
        { top: '120px', left: '200px' },
        { bottom: '120px', left: '120px' },
        { top: '120px', right: '200px' },
        { bottom: '207px', right: '306px' },
    ]

    const containerRef = useRef<HTMLDivElement>(null)
    const [hovered, setHovered] = useState<number | null>(null)
    const [cursor, setCursor] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    })

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            gsap.from('.project-pin', {
                opacity: 0,
                y: 20,
                scale: 0.95,
                ease: 'power2.out',
                stagger: 0.1,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 50%',
                    scrub: true,
                },
            })

            gsap.from('.curious-text h2', {
                opacity: 0,
                y: 40,
                ease: 'power2.out',
                stagger: 0.12,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    scrub: true,
                },
            })
        }, el)

        return () => ctx.revert()
    }, [])

    return (
        <>
            <div
                ref={containerRef}
                className='relative flex h-screen w-full items-center justify-center'
            >
                <div className='absolute inset-0'>
                    {(projects as Project[]).slice(0, 4).map((project, i) => (
                        <div
                            key={project.title}
                            className='project-pin group absolute z-30'
                            style={
                                fixedPositions[i] || { top: '50%', left: '50%' }
                            }
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            onMouseMove={(e) => {
                                const rect =
                                    containerRef.current?.getBoundingClientRect()
                                if (!rect) return
                                setCursor({
                                    x: e.clientX - rect.left + 14,
                                    y: e.clientY - rect.top + 6,
                                })
                            }}
                        >
                            <Link
                                href={`/work/${slugify(project.title)}`}
                                aria-label={`View ${project.title}`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    const wrapper =
                                        e.currentTarget as HTMLAnchorElement
                                    const img = wrapper.querySelector(
                                        'img'
                                    ) as HTMLImageElement | null
                                    if (!img) {
                                        router.push(
                                            `/work/${slugify(project.title)}`
                                        )
                                        return
                                    }

                                    const rect = img.getBoundingClientRect()
                                    const overlay =
                                        document.createElement('img')

                                    overlay.src = project.image
                                    overlay.alt = project.title
                                    Object.assign(overlay.style, {
                                        position: 'fixed',
                                        top: `${rect.top}px`,
                                        left: `${rect.left}px`,
                                        width: `${rect.width}px`,
                                        height: `${rect.height}px`,
                                        objectFit: 'cover',
                                        borderRadius:
                                            getComputedStyle(img)
                                                .borderRadius || '12px',
                                        zIndex: '999',
                                        imageRendering: 'high-quality',
                                    })
                                    document.body.appendChild(overlay)

                                    const maxWidth = Math.min(
                                        window.innerWidth - 48,
                                        1280
                                    )
                                    const finalHeight = maxWidth * (9 / 16)

                                    gsap.to(overlay, {
                                        top: '50%',
                                        left: '50%',
                                        width: maxWidth,
                                        height: finalHeight,
                                        x: '-50%',
                                        y: '-50%',
                                        duration: 0.55,
                                        ease: 'power3.inOut',
                                        onComplete: () => {
                                            router.push(
                                                `/work/${slugify(project.title)}`
                                            )
                                            setTimeout(
                                                () => overlay.remove(),
                                                400
                                            )
                                        },
                                    })
                                }}
                            >
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={400}
                                    height={400}
                                    className='project-image cursor-pointer rounded-md'
                                    priority={i === 0}
                                />
                            </Link>
                        </div>
                    ))}
                    {hovered !== null && (projects as Project[])[hovered] && (
                        <div
                            className='pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2'
                            style={{
                                left: `${cursor.x}px`,
                                top: `${cursor.y}px`,
                            }}
                        >
                            <div className='relative flex items-center'>
                                <span className='bg-primary rounded-full px-4 py-2 text-2xl'>
                                    {(projects as Project[])[hovered].title}
                                </span>
                                <div className='bg-primary cursor-pointer rounded-full p-2 transition-all'>
                                    <ArrowRight />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div
                    className={`curious-text w-full max-w-[800px] ${anton.className}`}
                >
                    <div
                        className={`relative grid grid-cols-2 text-center uppercase`}
                    >
                        <div className='col-span-1'>
                            <h2 className='text-primary text-[12vw] font-bold md:text-[8.5vw]'>
                                <span className='bg-primary px-[3rem] text-[#0f0301]'>
                                    Curious
                                </span>
                            </h2>
                        </div>
                        <div className='col-span-1' />
                    </div>
                    <div className={`grid grid-cols-2 text-center uppercase`}>
                        <div className='col-span-1' />
                        <div className='col-span-1'>
                            <h2 className='text-primary text-[12vw] font-bold md:text-[8.5vw]'>
                                about
                            </h2>
                        </div>
                    </div>
                    <div className={`grid grid-cols-2 text-center uppercase`}>
                        <div className='col-span-1'>
                            <h2 className='text-primary text-[12vw] font-bold md:text-[8.5vw]'>
                                my
                            </h2>
                        </div>
                        <div className='col-span-1' />
                    </div>
                    <div className={`grid grid-cols-2 text-center uppercase`}>
                        <div className='col-span-1' />
                        <div className='col-span-1'>
                            <h2 className='text-primary text-[12vw] font-bold md:text-[8.5vw]'>
                                <span className='outline-text'>work</span>?
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Curious

export function ArrowRight() {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 24 24'
        >
            <path
                fill='none'
                stroke='#0f0f0f'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
                d='M6 18L18 6m0 0H9m9 0v9'
            />
        </svg>
    )
}
