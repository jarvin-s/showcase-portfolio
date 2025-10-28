import { Anton } from 'next/font/google'

const anton = Anton({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-anton',
})

const Curious = () => {
    return (
        <div className='flex h-screen w-full items-center justify-center'>
            <div className='w-full max-w-[800px]'>
                <div
                    className={`grid grid-cols-2 text-center uppercase ${anton.className}`}
                >
                    <div className='col-span-1'>
                        <h2 className='outline-text text-primary text-[12vw] font-bold md:text-[8.5vw]'>
                            Curious
                        </h2>
                    </div>
                    <div className='col-span-1' />
                </div>
                <div
                    className={`grid grid-cols-2 text-center uppercase ${anton.className}`}
                >
                    <div className='col-span-1' />
                    <div className='col-span-1'>
                        <h2 className='text-primary text-[12vw] font-bold md:text-[8.5vw]'>
                            about
                        </h2>
                    </div>
                </div>
                <div
                    className={`grid grid-cols-2 text-center uppercase ${anton.className}`}
                >
                    <div className='col-span-1'>
                        <h2 className='text-primary text-[12vw] font-bold md:text-[8.5vw]'>
                            my
                        </h2>
                    </div>
                    <div className='col-span-1' />
                </div>
                <div
                    className={`grid grid-cols-2 text-center uppercase ${anton.className}`}
                >
                    <div className='col-span-1' />
                    <div className='col-span-1'>
                        <h2 className='text-primary text-[12vw] font-bold md:text-[8.5vw]'>
                            <span className='outline-text'>work</span>?
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Curious
