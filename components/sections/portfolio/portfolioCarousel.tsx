'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

import { urlFor } from '@/sanity/lib/image'
import config from '@/lib/config.preval'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/shadcn/carousel'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/popover'
import { AspectRatio } from '@/components/shadcn/aspect-ratio'
import { Card } from '@/components/shadcn/card'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/shadcn/dialog'
import { Button } from '@/components/shadcn/button'
import { Separator } from '@/components/shadcn/separator'

import { Product } from '@/sanity.types'

import { IoIosInformationCircleOutline } from 'react-icons/io'

const PortfolioCarousel = ({ product }: { product: Product }) => {
    const [api, setApi] = useState<CarouselApi>()
    const [thumbsApi, setThumbsApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)

    const onSelect = useCallback(() => {
        if (!api) return
        setCurrent(api.selectedScrollSnap())
        if (!thumbsApi) return
        thumbsApi.scrollTo(api.selectedScrollSnap())
    }, [api, thumbsApi])

    const scrollToSlide = useCallback(
        (index: number) => {
            if (!api) return
            api.scrollTo(index)
        },
        [api]
    )

    useEffect(() => {
        if (!api) {
            return
        }
        api.on('select', onSelect)
        onSelect()
    }, [api])

    return (
        <section className="flex flex-col gap-2 self-center max-w-screen-md w-full">
            <Popover>
                <PopoverTrigger asChild>
                    <IoIosInformationCircleOutline className="text-2xl self-end cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent side="bottom" align="end" className="w-full max-w-screen-sm flex flex-col gap-2">
                    <p>
                        <span className="font-medium">Name:</span> {product.name}
                    </p>
                    <p>
                        <span className="font-medium">Description:</span> {product.description}
                    </p>
                    {product.stock > 0 && (
                        <>
                            <Separator />
                            <Button asChild>
                                <Link href={`${config.siteUrl}/shop/${product._id}`} className="no-underline">
                                    Available in shop
                                </Link>
                            </Button>
                        </>
                    )}
                </PopoverContent>
            </Popover>
            <Card className="w-full p-2 cursor-pointer">
                <Carousel className="rounded-md overflow-hidden" setApi={setApi}>
                    <CarouselContent>
                        {[product.image, ...(product.gallery || [])].map(
                            (item, index) =>
                                item && (
                                    <CarouselItem key={index}>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <AspectRatio ratio={16 / 9}>
                                                    <Image
                                                        src={urlFor(item).width(984).url()}
                                                        alt={product.name}
                                                        loading="lazy"
                                                        placeholder="blur"
                                                        objectFit="cover"
                                                        blurDataURL={urlFor(item).width(24).height(24).blur(10).url()}
                                                        unoptimized
                                                        fill
                                                        className="rounded-md"
                                                    />
                                                </AspectRatio>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-screen-lg" aria-describedby={product.description}>
                                                <DialogTitle>{product.name}</DialogTitle>
                                                <Image
                                                    src={urlFor(item).width(984).url()}
                                                    alt={product.name}
                                                    className="rounded-md"
                                                    loading="lazy"
                                                    layout="responsive"
                                                    placeholder="blur"
                                                    width={4}
                                                    height={3}
                                                    blurDataURL={urlFor(item).width(24).height(24).blur(10).url()}
                                                    unoptimized
                                                />
                                            </DialogContent>
                                        </Dialog>
                                    </CarouselItem>
                                )
                        )}
                    </CarouselContent>
                </Carousel>
            </Card>
            <Carousel setApi={setThumbsApi}>
                <CarouselContent className="flex space-x-2 m-0">
                    {[product.image, ...(product.gallery || [])].map(
                        (item, index) =>
                            item && (
                                <button
                                    key={index}
                                    className={`w-16 h-16 rounded-md overflow-hidden border ${current === index ? 'border-primary' : 'border-transparent'}`}
                                    onClick={() => scrollToSlide(index)}
                                >
                                    <Image
                                        src={urlFor(item).width(64).height(64).url()}
                                        alt={`Thumbnail ${index + 1}`}
                                        loading="lazy"
                                        placeholder="blur"
                                        blurDataURL={urlFor(item).width(24).height(24).blur(10).url()}
                                        width={64}
                                        height={64}
                                        unoptimized
                                    />
                                </button>
                            )
                    )}
                </CarouselContent>
            </Carousel>
        </section>
    )
}

export default PortfolioCarousel
