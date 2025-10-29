'use client'

import Image from 'next/image'
import Link from 'next/link'
import projects from '@/lib/projects.json'
import { slugify } from '@/lib/utils'
import { use, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type Project = {
    title: string
    description: string
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

    const all = projects as Project[]
    const project = all.find((p) => slugify(p.title) === slug)

    useEffect(() => {
        if (!project || !containerRef.current) return

        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            gsap.from('.project-image-wrapper', {
                opacity: 0,
                scale: 0.95,
                duration: 0.8,
                ease: 'power2.out',
            })

            gsap.from('.project-title', {
                opacity: 0,
                y: 30,
                duration: 0.6,
                delay: 0.2,
                ease: 'power2.out',
            })

            gsap.from('.project-description', {
                opacity: 0,
                y: 20,
                duration: 0.6,
                delay: 0.3,
                ease: 'power2.out',
            })

            gsap.from('.project-tag', {
                opacity: 0,
                scale: 0.8,
                duration: 0.4,
                stagger: 0.05,
                delay: 0.4,
                ease: 'back.out(1.7)',
            })

            gsap.from('.project-button', {
                opacity: 0,
                y: 20,
                duration: 0.5,
                delay: 0.5,
                ease: 'power2.out',
            })
        }, containerRef)

        return () => ctx.revert()
    }, [project])

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
        <section ref={containerRef} className='mx-auto max-w-7xl px-6 py-16'>
            <Link href='/' className='text-white/80 hover:text-white'>
                ← Back to home
            </Link>
            <div className='mt-6 flex flex-col items-start gap-8'>
                <div className='project-image-wrapper relative aspect-[16/9] w-full overflow-hidden rounded-xl'>
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className='object-cover'
                    />
                </div>
                <div>
                    <h1 className='project-title text-primary text-4xl font-extrabold'>
                        {project.title}
                    </h1>
                    <p className='project-description mt-3 text-lg text-white/80'>
                        {project.description}
                    </p>
                    <div className='mt-4 flex flex-wrap gap-2'>
                        {project.tags.map((t) => (
                            <span
                                key={t}
                                className='project-tag rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-sm text-white/90'
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                    <div className='mt-6'>
                        <a
                            href={project.link}
                            target='_blank'
                            rel='noreferrer'
                            className='project-button bg-primary hover:bg-primary/90 inline-block rounded-full px-4 py-2 text-xl text-black'
                        >
                            Visit project
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
