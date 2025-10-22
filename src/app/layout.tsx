import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/header/navbar'

const inter = Inter_Tight({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-inter',
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
            <body suppressHydrationWarning className={inter.variable}>
                <Navbar />
                {children}
            </body>
        </html>
    )
}
