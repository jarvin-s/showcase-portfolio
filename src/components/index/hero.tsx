import { Anton } from 'next/font/google'

const anton = Anton({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-anton',
})

export default function Hero() {
    return (
        <div className='relative h-screen'>
            <div className='z-10 flex h-full w-full flex-col items-center justify-center'>
                <div
                    className={`text-primary relative text-[20vw] font-bold ${anton.className} flex flex-col items-center justify-center text-center leading-[0.88] uppercase`}
                >
                    Jarvin Siegers
                </div>
            </div>
        </div>
    )
}
