import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/header/navbar'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'

const openSans = Open_Sans({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-open-sans',
})

export const metadata: Metadata = {
    title: 'Jarvin Siegers - Personal Portfolio',
    description: 'Personal Portfolio by Jarvin Siegers',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body suppressHydrationWarning className={openSans.className}>
                <SmoothScrollProvider>
                    <Navbar />
                    {children}
                </SmoothScrollProvider>
            </body>
        </html>
    )
}
