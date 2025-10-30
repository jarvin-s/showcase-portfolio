import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/header/navbar'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'

const spaceGrotesk = Space_Grotesk({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
    title: 'Jarvin Siegers - Showcase Portfolio',
    description: 'Showcase Portfolio by Jarvin Siegers',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body suppressHydrationWarning className={spaceGrotesk.className}>
                <SmoothScrollProvider>
                    <Navbar />
                    {children}
                </SmoothScrollProvider>
            </body>
        </html>
    )
}
