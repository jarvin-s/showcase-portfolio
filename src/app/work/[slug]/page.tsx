import Image from 'next/image'
import Link from 'next/link'
import projects from '@/lib/projects.json'
import { slugify } from '@/lib/utils'

type Project = {
    title: string
    description: string
    image: string
    link: string
    tags: string[]
}

type Params = {
    params: { slug: string }
}

export default function ProjectPage({ params }: Params) {
    const all = projects as Project[]
    const project = all.find((p) => slugify(p.title) === params.slug)

    if (!project) {
        return (
            <section className='mx-auto max-w-3xl px-6 py-24 text-center'>
                <h1 className='text-2xl font-semibold text-white'>
                    Project not found
                </h1>
                <Link
                    href='/work'
                    className='mt-6 inline-block rounded-md bg-white px-4 py-2 text-sm font-medium text-black'
                >
                    Back to work
                </Link>
            </section>
        )
    }

    return (
        <section className='mx-auto max-w-5xl px-6 py-16'>
            <Link href='/work' className='text-white/80 hover:text-white'>
                ← Back
            </Link>
            <div className='mt-6 grid grid-cols-1 items-start gap-8 md:grid-cols-2'>
                <div className='relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5'>
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className='object-cover'
                    />
                </div>
                <div>
                    <h1 className='text-primary text-4xl font-extrabold'>
                        {project.title}
                    </h1>
                    <p className='mt-3 text-white/80'>{project.description}</p>
                    <div className='mt-4 flex flex-wrap gap-2'>
                        {project.tags.map((t) => (
                            <span
                                key={t}
                                className='rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-xs text-white/90'
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
                            className='rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90'
                        >
                            Visit project
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function generateStaticParams() {
    const all = projects as Project[]
    return all.map((p) => ({ slug: slugify(p.title) }))
}
