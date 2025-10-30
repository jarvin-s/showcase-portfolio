import Spacer from '@/components/common/spacer'
import Contact from '@/components/index/contact'
import Curious from '@/components/index/curious'
import Hero from '@/components/index/hero'

export default function Home() {
    return (
        <>
            <div id='hero'>
                <Hero />
            </div>
            <Spacer />
            <div id='curious'>
                <Curious />
            </div>
            <Spacer />
            <div id='contact'>
                <Contact />
            </div>
        </>
    )
}
