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
                    href='/'
                    className='bg-primary hover:bg-primary/90 rounded-full px-4 py-2 text-xl text-black'
                >
                    Back to home
                </Link>
            </section>
        )
    }

    return (
        <section className='mx-auto max-w-7xl px-6 py-16'>
            <Link href='/' className='text-white/80 hover:text-white'>
                ← Back to home
            </Link>
            <div className='mt-6 flex flex-col items-start gap-8'>
                <div className='relative aspect-[16/9] w-full overflow-hidden'>
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
                    <p className='mt-3 text-lg text-white/80'>
                        {project.description}
                    </p>
                    <div className='mt-4 flex flex-wrap gap-2'>
                        {project.tags.map((t) => (
                            <span
                                key={t}
                                className='rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-sm text-white/90'
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
                            className='bg-primary hover:bg-primary/90 rounded-full px-4 py-2 text-xl text-black'
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
