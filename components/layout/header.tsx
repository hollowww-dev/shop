import Link from 'next/link'

import config from '@/lib/config.preval'

const Header = () => {
    return (
        <>
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
