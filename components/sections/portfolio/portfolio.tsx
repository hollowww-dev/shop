'use client'

import Image from 'next/image'
import Link from 'next/link'

import config from '@/lib/config.preval'
import { urlFor } from '@/sanity/lib/image'

import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { Card } from '@/components/shadcn/card'
import product from '@/components/sections/shop/product'

import { PortfolioType } from '@/types'

const Portfolio = ({ album }: { album: PortfolioType }) => {
    return (
        <Link href={`${config.siteUrl}/portfolio/${album._id}`} prefetch={true} className="no-underline">
            <Card className="p-2 active:shadow-none transition-shadow cursor-pointer">
                <AspectRatio ratio={1} className="relative overflow-hidden rounded-md">
                    <Image
                        src={urlFor(album.cover).width(400).height(400).url()}
                        placeholder="blur"
                        blurDataURL={urlFor(album.cover).width(24).height(24).blur(10).url()}
                        alt={product.name}
                        className="aspect-square object-cover"
                        loading="lazy"
                        unoptimized
                        fill
                    />
                    <div className="absolute bg-black w-full h-full flex items-center justify-center bg-opacity-15">
                        <h2 className="text-background uppercase spacing-4 tracking-wider text-center">
                            {album.title} ({album.count})
                        </h2>
                    </div>
                </AspectRatio>
            </Card>
        </Link>
    )
}
export default Portfolio
