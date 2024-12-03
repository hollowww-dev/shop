import Header from '@/components/layout/header'
import { Button } from '@/components/shadcn/button'
import { Card, CardContent } from '@/components/shadcn/card'
import configPreval from '@/lib/config.preval'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page() {
    return (
        <>
            <Header />
            <main className="container mx-auto flex flex-col flex-grow gap-6 lg:gap-12">
                <Card className="w-full aspect-[9/16] md:aspect-[16/9] p-2">
                    <CardContent className="w-full h-full rounded-md overflow-hidden relative p-0">
                        <Image
                            src={urlFor(configPreval.landingImage.image).width(1000).url()}
                            alt="Landing page image"
                            className="object-cover"
                            fill
                            loading="eager"
                        />
                        <div
                            className="w-full h-full absolute bg-foreground"
                            style={{ backgroundColor: `rgba(0, 0, 0, ${configPreval.landingImage.overlay / 100})` }}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full place-items-center absolute text-white tracking-wide">
                            <Button variant="ghost" size="lg" className="text-xl border border-white hover:bg-white font-thin no-underline py-6" asChild>
                                <Link href="/shop">Shop</Link>
                            </Button>
                            <Button variant="ghost" size="lg" className="text-xl border border-white hover:bg-white font-thin no-underline py-6" asChild>
                                <Link href="/portfolio">Portfolio</Link>
                            </Button>
                            <Button variant="ghost" size="lg" className="text-xl border border-white hover:bg-white font-thin no-underline py-6" asChild>
                                <Link href="/aboutme">About me</Link>
                            </Button>
                            <Button variant="ghost" size="lg" className="text-xl border border-white hover:bg-white font-thin no-underline py-6" asChild>
                                <Link href="/faq">FAQ</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </>
    )
}
