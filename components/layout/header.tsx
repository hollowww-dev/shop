import Link from 'next/link'

import config from '@/lib/config.preval'

import { Button } from '@/components/shadcn/button'
import Cart from '@/components/layout/cart'
import Hamburger from '@/components/layout/hamburger'

const Header = () => {
    return (
        <>
            <nav className="sticky top-0 z-10 container mx-auto py-2 flex justify-between items-center bg-background border-b border-x rounded-b-md border-border shadow">
                <div className="hidden lg:flex gap-6">
                    <Button variant="ghost" size="lg" asChild>
                        <Link href="/shop" className="no-underline">
                            Shop
                        </Link>
                    </Button>
                    <Button variant="ghost" size="lg" asChild>
                        <Link href="/portfolio" className="no-underline">
                            Portfolio
                        </Link>
                    </Button>
                    <Button variant="ghost" size="lg" asChild>
                        <Link href="/aboutme" className="no-underline">
                            About me
                        </Link>
                    </Button>
                    <Button variant="ghost" size="lg" asChild>
                        <Link href="/faq" className="no-underline">
                            FAQ
                        </Link>
                    </Button>
                </div>
                <Hamburger />
                <Cart />
            </nav>
            <header className="container mx-auto py-12 lg:py-24 text-center">
                <h1>
                    <Link href={config.siteUrl} className="no-underline">
                        {config.title}
                    </Link>
                </h1>
            </header>
        </>
    )
}

export default Header
