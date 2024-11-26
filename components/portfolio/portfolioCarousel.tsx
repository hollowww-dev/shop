"use client"

import { Product } from "@/sanity.types"
import { urlFor } from "@/sanity/lib/image"
import { IoIosInformationCircleOutline } from "react-icons/io"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "../ui/carousel"
import Image from "next/image"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { AspectRatio } from "../ui/aspect-ratio"
import { Card } from "../ui/card"
import { useCallback, useEffect, useState } from "react"

const PortfolioCarousel = ({ product }: { product: Product }) => {
    const [api, setApi] = useState<CarouselApi>()
    const [thumbsApi, setThumbsApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)

    const onSelect = useCallback(() => {
        if (!api) return;
        setCurrent(api.selectedScrollSnap());
        if (!thumbsApi) return;
        thumbsApi.scrollTo(api.selectedScrollSnap());
    }, [api, thumbsApi]);

    const scrollToSlide = useCallback(
        (index: number) => {
            if (!api) return;
            api.scrollTo(index);
        },
        [api]
    );

    useEffect(() => {
        if (!api) {
            return
        }
        api.on("select", onSelect);
        onSelect();
    }, [api])

    return (
        <section className="flex flex-col gap-2 self-center max-w-screen-md w-full">
            <Popover>
                <PopoverTrigger asChild>
                    <IoIosInformationCircleOutline className="text-2xl self-end cursor-pointer active:scale-90 transition" />
                </PopoverTrigger>
                <PopoverContent side="bottom" align="end" className="w-full max-w-screen-sm">
                    <p><span className="font-medium">Name:</span> {product.name}</p>
                    <p><span className="font-medium">Description:</span> {product.description}</p>
                </PopoverContent>
            </Popover>
            <Card className="w-full p-2">
                <Carousel className="rounded-md overflow-hidden" setApi={setApi}>
                    <CarouselContent>
                        {[product.image, ...(product.gallery || [])].map(
                            (item, index) =>
                                item && (
                                    <CarouselItem key={index}>
                                        <AspectRatio ratio={16 / 9}>
                                            <Image
                                                src={urlFor(item).width(696).height(390).url()}
                                                alt={product.name}
                                                loading='lazy'
                                                placeholder='blur'
                                                blurDataURL={urlFor(item)
                                                    .width(24)
                                                    .height(24)
                                                    .blur(10)
                                                    .url()}
                                                unoptimized
                                                fill
                                            />
                                        </AspectRatio>
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
                                    className={`w-16 h-16 rounded-md overflow-hidden border ${current === index ? "border-primary" : "border-transparent"
                                        }`}
                                    onClick={() => scrollToSlide(index)}>
                                    <Image
                                        src={urlFor(item).width(64).height(64).url()}
                                        alt={`Thumbnail ${index + 1}`}
                                        loading="lazy"
                                        placeholder="blur"
                                        blurDataURL={urlFor(item)
                                            .width(24)
                                            .height(24)
                                            .blur(10)
                                            .url()}
                                        width={64}
                                        height={64}
                                        unoptimized
                                    />
                                </button>
                            )
                    )}</CarouselContent>
            </Carousel>
        </section>
    )
}

export default PortfolioCarousel