import React from 'react'
import { Anton } from 'next/font/google'
import Link from 'next/link'

const anton = Anton({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-anton',
})

const Contact = () => {
    return (
        <div className='flex h-screen w-full flex-col items-center justify-center'>
            <h1
                className={`text-primary text-center text-[12vw] font-bold md:text-[8.5vw] ${anton.className} uppercase`}
            >
                Let&apos;s chat!
            </h1>
            <h2
                className={`text-primary ${anton.className} text-center text-[8vw] font-bold uppercase md:text-[5vw]`}
            >
                <Link
                    href='mailto:jarvin.siegers@gmail.com'
                    target='_blank'
                    className='underline'
                >
                    hello@jarvinsiegers.com
                </Link>
            </h2>
            <h2
                className={`text-primary ${anton.className} text-center text-[8vw] font-bold uppercase md:text-[5vw]`}
            >
                Connect with me on{' '}
                <Link
                    href='https://www.linkedin.com/in/jarvin-siegers/'
                    target='_blank'
                    className='outline-text underline'
                >
                    LinkedIn
                </Link>
            </h2>
        </div>
    )
}

export default Contact
