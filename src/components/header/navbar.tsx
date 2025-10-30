'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import gsap from 'gsap'

export default function Navbar() {
    const pathname = usePathname()
    const router = useRouter()
    const scrollToId = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault()
        setIsMenuOpen(false)
        if (pathname === '/') {
            const el = document.getElementById(id)
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
            router.push(`/#${id}`)
        }
    }
    const navbarRef = useRef(null)
    const homeRef = useRef(null)
    const workRef = useRef(null)
    const contactRef = useRef(null)

    useEffect(() => {
        gsap.set([homeRef.current, workRef.current, contactRef.current], {
            opacity: 0,
        })

        const tl = gsap.timeline()
        tl.fromTo(
            [homeRef.current, workRef.current, contactRef.current],
            {
                opacity: 0,
                y: 50,
            },
            {
                opacity: 1,
                y: 0,
                duration: 2,
                ease: 'power2.out',
                delay: 0.4,
                stagger: 0.2,
            }
        )
    }, [])
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [hoveredLink, setHoveredLink] = useState<string | null>(null)
    const menuRef = useRef(null)

    useEffect(() => {
        if (isMenuOpen) {
            gsap.fromTo(
                menuRef.current,
                {
                    opacity: 0,
                    y: 50,
                    display: 'flex',
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: 'power2.out',
                }
            )
        } else {
            gsap.to(menuRef.current, {
                opacity: 0,
                y: 50,
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => {
                    if (menuRef.current) {
                        ;(menuRef.current as HTMLElement).style.display = 'none'
                    }
                },
            })
        }
    }, [isMenuOpen])

    return (
        <nav ref={navbarRef} className={'fixed top-0 right-0 z-50 p-6'}>
            <div className='flex items-center justify-between'>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className='z-50 cursor-pointer md:hidden'
                    aria-label='Toggle menu'
                >
                    {isMenuOpen ? <CloseMenu /> : <HamburgerMenu />}
                </button>

                <div className='hidden md:block'>
                    <ul className='flex flex-row items-center gap-6'>
                        <li ref={homeRef} style={{ opacity: 0 }}>
                            <Link
                                href='/'
                                className={`text-primary text-2xl font-bold transition-opacity ${
                                    hoveredLink && hoveredLink !== 'home'
                                        ? 'opacity-30'
                                        : ''
                                }`}
                                onMouseEnter={() => setHoveredLink('home')}
                                onMouseLeave={() => setHoveredLink(null)}
                                onClick={scrollToId('hero')}
                            >
                                Home
                            </Link>
                        </li>
                        <li ref={workRef} style={{ opacity: 0 }}>
                            <Link
                                href='/work'
                                className={`text-primary text-2xl font-bold transition-opacity ${
                                    hoveredLink && hoveredLink !== 'work'
                                        ? 'opacity-30'
                                        : ''
                                }`}
                                onMouseEnter={() => setHoveredLink('work')}
                                onMouseLeave={() => setHoveredLink(null)}
                                onClick={scrollToId('curious')}
                            >
                                Work
                            </Link>
                        </li>
                        <li
                            ref={contactRef}
                            className='flex items-center'
                            style={{ opacity: 0 }}
                            onMouseEnter={() => setHoveredLink('contact')}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            <Link
                                href='/contact'
                                className={`border-primary rounded-full border border-dotted px-4 py-2 text-2xl font-bold transition-all ${
                                    hoveredLink && hoveredLink !== 'contact'
                                        ? 'text-primary/30 border-primary/30'
                                        : hoveredLink === 'contact'
                                          ? 'bg-primary text-[#0f0f0f]'
                                          : 'text-primary'
                                }`}
                                onClick={scrollToId('contact')}
                            >
                                Contact
                            </Link>
                            <div
                                className={`border-primary cursor-pointer rounded-full border border-dotted p-2 transition-all ${
                                    hoveredLink && hoveredLink !== 'contact'
                                        ? 'opacity-30'
                                        : hoveredLink === 'contact'
                                          ? 'bg-primary text-[#0f0f0f]'
                                          : ''
                                }`}
                            >
                                <ArrowRight
                                    isHovered={hoveredLink === 'contact'}
                                />
                            </div>
                        </li>
                    </ul>
                </div>

                <ul
                    ref={menuRef}
                    className='text-primary fixed inset-0 hidden flex-col items-center justify-center gap-12 bg-[#0f0f0f] text-5xl font-bold md:hidden'
                >
                    <li>
                        <Link
                            href='/'
                            className={`transition-opacity ${
                                hoveredLink && hoveredLink !== 'home'
                                    ? 'opacity-30'
                                    : ''
                            }`}
                            onClick={scrollToId('hero')}
                            onMouseEnter={() => setHoveredLink('home')}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='/work'
                            className={`transition-opacity ${
                                hoveredLink && hoveredLink !== 'work'
                                    ? 'opacity-30'
                                    : ''
                            }`}
                            onClick={scrollToId('curious')}
                            onMouseEnter={() => setHoveredLink('work')}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            Work
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='/contact'
                            className={`transition-opacity ${
                                hoveredLink && hoveredLink !== 'contact'
                                    ? 'opacity-30'
                                    : ''
                            }`}
                            onClick={scrollToId('contact')}
                            onMouseEnter={() => setHoveredLink('contact')}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export function HamburgerMenu() {
    return (
        <svg
            width='24'
            height='24'
            viewBox='0 0 65 46'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <rect width='65' height='8' fill='#FFEDCF' />
            <rect y='19' width='65' height='8' fill='#FFEDCF' />
            <rect y='38' width='65' height='8' fill='#FFEDCF' />
        </svg>
    )
}

export function CloseMenu() {
    return (
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M18 6L6 18M6 6L18 18'
                stroke='#FFEDCF'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    )
}

export function ArrowRight({ isHovered }: { isHovered: boolean }) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 24 24'
        >
            <path
                fill='none'
                stroke={isHovered ? '#0f0f0f' : '#FFEDCF'}
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
                d='M6 18L18 6m0 0H9m9 0v9'
            />
        </svg>
    )
}
