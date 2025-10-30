'use client'

import Link from 'next/link'
import projects from '@/lib/projects.json'
import { slugify } from '@/lib/utils'
import { use, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ImageHover } from '@/components/ui/image-hover'
import Spacer from '@/components/common/spacer'

type Project = {
    title: string
    description: string
    description2: string
    image: string
    link: string
    tags: string[]
}

export default function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { slug } = use(params)
    const imageRef = useRef<HTMLDivElement | null>(null)
    const titleRef = useRef<HTMLHeadingElement | null>(null)
    const descriptionRef = useRef<HTMLParagraphElement | null>(null)
    const description2Ref = useRef<HTMLParagraphElement | null>(null)
    const tagsRef = useRef<HTMLDivElement | null>(null)
    const buttonRef = useRef<HTMLAnchorElement | null>(null)
    const animationRef = useRef<gsap.Context | null>(null)

    const all = projects as Project[]
    const project = all.find((p) => slugify(p.title) === slug)

    useEffect(() => {
        if (!project) return

        const handleOverlay = () => {
            const overlay = document.querySelector(
                `img[data-project-overlay="true"][data-project-slug="${slug}"]`
            ) as HTMLImageElement | null

            if (overlay && imageRef.current) {
                const imageRect = imageRef.current.getBoundingClientRect()
                const bg = document.querySelector(
                    '[data-route-bg="true"]'
                ) as HTMLDivElement | null
                if (bg) {
                    bg.style.transformOrigin = 'top'
                }
                gsap.to(overlay, {
                    top: `${imageRect.top}px`,
                    left: `${imageRect.left}px`,
                    width: `${imageRect.width}px`,
                    height: `${imageRect.height}px`,
                    x: 0,
                    y: 0,
                    borderRadius: '12px',
                    duration: 0.6,
                    ease: 'power2.out',
                    onComplete: () => {
                        setTimeout(() => {
                            overlay.remove()
                            if (bg) {
                                gsap.to(bg, {
                                    scaleY: 0,
                                    duration: 0.6,
                                    ease: 'power2.inOut',
                                    onComplete: () => bg.remove(),
                                })
                            }
                            if (animationRef.current) {
                                animationRef.current.kill()
                            }
                            startPageAnimations()
                        }, 100)
                    },
                })
            } else {
                const bg = document.querySelector(
                    '[data-route-bg="true"]'
                ) as HTMLDivElement | null
                if (bg) {
                    bg.style.transformOrigin = 'top'
                    gsap.to(bg, {
                        scaleY: 0,
                        duration: 0.6,
                        ease: 'power2.inOut',
                        onComplete: () => bg.remove(),
                    })
                }
                startPageAnimations()
            }
        }

        setTimeout(handleOverlay, 50)

        function startPageAnimations() {
            if (animationRef.current) {
                animationRef.current.kill()
            }

            gsap.set(
                [
                    imageRef.current,
                    titleRef.current,
                    descriptionRef.current,
                    description2Ref.current,
                    buttonRef.current,
                ],
                { opacity: 0 }
            )
            if (titleRef.current) gsap.set(titleRef.current, { y: 30 })
            if (descriptionRef.current)
                gsap.set(descriptionRef.current, { y: 20 })
            if (description2Ref.current)
                gsap.set(description2Ref.current, { y: 20 })
            if (tagsRef.current)
                gsap.set(tagsRef.current.querySelectorAll('.project-tag'), {
                    opacity: 0,
                    scale: 0.8,
                })

            animationRef.current = gsap.context(() => {
                const tl = gsap.timeline({
                    onComplete: () => {
                        animationRef.current = null
                    },
                })

                if (imageRef.current) {
                    gsap.set(imageRef.current, { visibility: 'visible' })
                }

                tl.to(imageRef.current, {
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                })
                    .to(
                        titleRef.current,
                        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
                        '-=0.4'
                    )
                    .to(
                        descriptionRef.current,
                        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
                        '-=0.35'
                    )
                    .to(
                        description2Ref.current,
                        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
                        '-=0.35'
                    )
                    .to(
                        tagsRef.current?.querySelectorAll('.project-tag') || [],
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 0.7,
                            ease: 'power2.out',
                        },
                        '-=0.35'
                    )
                    .to(
                        buttonRef.current,
                        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
                        '-=0.3'
                    )
            }, containerRef)
        }

        return () => {
            if (animationRef.current) animationRef.current.kill()
        }
    }, [project, slug])

    if (!project) {
        return (
            <section className='mx-auto max-w-3xl px-6 py-24 text-center'>
                <h1 className='text-2xl font-semibold text-white'>
                    Project not found
                </h1>
                <Link
                    href='/'
                    className='bg-primary hover:bg-primary/90 rounded-full px-4 py-2 text-xl text-black'
                >
                    Back to home
                </Link>
            </section>
        )
    }

    return (
        <section ref={containerRef} className='mx-auto max-w-6xl px-6 py-16'>
            <div className='mt-6 flex flex-col items-start gap-8'>
                <div
                    ref={imageRef}
                    className='project-image-wrapper relative z-50 aspect-[16/9] w-full overflow-hidden'
                    style={{ opacity: 0, visibility: 'hidden' }}
                >
                    <ImageHover
                        src={project.image}
                        alt={project.title}
                        fill
                        className='rounded-md'
                        movementIntensity={20}
                    />
                </div>
                <div>
                    <h1
                        ref={titleRef}
                        className='project-title text-primary text-4xl font-extrabold'
                        style={{ opacity: 0 }}
                    >
                        {project.title}
                    </h1>
                    <p
                        ref={descriptionRef}
                        className='project-description mt-3 text-lg text-white/80'
                        style={{ opacity: 0 }}
                    >
                        {project.description}
                    </p>
                    <p
                        ref={description2Ref}
                        className='project-description2 mt-3 text-lg text-white/80'
                        style={{ opacity: 0 }}
                    >
                        {project.description2}
                    </p>
                    <div ref={tagsRef} className='mt-4 flex flex-wrap gap-2'>
                        {project.tags.map((t) => (
                            <span
                                key={t}
                                className='project-tag rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-sm text-white/90'
                                style={{ opacity: 0 }}
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                    <div className='mt-6'>
                        <a
                            ref={buttonRef}
                            href={project.link}
                            target='_blank'
                            rel='noreferrer'
                            className='project-button bg-primary hover:bg-primary/90 inline-block rounded-full px-4 py-2 text-xl text-black'
                            style={{ opacity: 0 }}
                        >
                            Visit project
                        </a>
                    </div>
                </div>
            </div>
            <Spacer />
        </section>
    )
}
