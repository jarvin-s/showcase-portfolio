'use client'

import Link from 'next/link'
import { Inter_Tight } from 'next/font/google'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

const inter = Inter_Tight({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-inter',
})

export default function Navbar() {
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
        <nav className={`fixed top-0 right-0 z-50 p-6 ${inter.className}`}>
            <div className='flex items-center justify-between'>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className='z-50 cursor-pointer md:hidden'
                    aria-label='Toggle menu'
                >
                    {isMenuOpen ? <CloseMenu /> : <HamburgerMenu />}
                </button>

                <div className='hidden md:block'>
                    <ul className='flex flex-row gap-6'>
                        <li>
                            <Link
                                href='/'
                                className={`text-primary text-3xl font-bold transition-opacity ${
                                    hoveredLink && hoveredLink !== 'home'
                                        ? 'opacity-30'
                                        : ''
                                }`}
                                onMouseEnter={() => setHoveredLink('home')}
                                onMouseLeave={() => setHoveredLink(null)}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/work'
                                className={`text-primary text-3xl font-bold transition-opacity ${
                                    hoveredLink && hoveredLink !== 'work'
                                        ? 'opacity-30'
                                        : ''
                                }`}
                                onMouseEnter={() => setHoveredLink('work')}
                                onMouseLeave={() => setHoveredLink(null)}
                            >
                                Work
                            </Link>
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
                            onClick={() => setIsMenuOpen(false)}
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
                            onClick={() => setIsMenuOpen(false)}
                            onMouseEnter={() => setHoveredLink('work')}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            Work
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
