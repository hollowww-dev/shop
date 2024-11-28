import { AspectRatio } from '@/components/shadcn/aspect-ratio'
import { Button } from '@/components/shadcn/button'
import { Card, CardContent, CardHeader } from '@/components/shadcn/card'
import { Skeleton } from '@/components/shadcn/skeleton'

import { VscListFilter, VscSettings } from 'react-icons/vsc'
import { IoIosInformationCircleOutline } from 'react-icons/io'

export const PortfolioSkeleton = () => {
    return (
        <Card className="p-3">
            <AspectRatio ratio={1} className="relative">
                <Skeleton className="w-full h-full" />
            </AspectRatio>
        </Card>
    )
}

export const PortfoliosSkeleton = () => {
    return (
        <section className="flex flex-col gap-2">
            <div className="flex gap-2 self-end">
                <Button variant={'outline'} size="icon" disabled>
                    <VscListFilter />
                </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-6 py-3">
                {Array.from({ length: 2 }).map((_, i) => (
                    <PortfolioSkeleton key={i} />
                ))}
            </div>
        </section>
    )
}

export const PortfolioDetailsSkeleton = () => {
    return (
        <>
            <section className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3 self-center w-full max-w-screen-lg">
                    <Card className="p-2 flex self-center sm:self-start shrink-0">
                        <Skeleton className="w-[200px] h-[200px]" />
                    </Card>
                    <div className="w-full flex flex-col gap-3 py-3">
                        <Skeleton className="w-full h-[2rem]" />
                        <Skeleton className="w-2/3 h-[1.75rem]" />
                        <Skeleton className="w-1/4 h-[1.75rem] mt-auto" />
                    </div>
                </div>
            </section>
            <section className="flex flex-col gap-2 self-center max-w-screen-lg w-full">
                <IoIosInformationCircleOutline className="text-2xl self-end opacity-25" />
                <Card className="w-full p-2">
                    <AspectRatio ratio={16 / 9}>
                        <Skeleton className="w-full h-full" />
                    </AspectRatio>
                </Card>
            </section>
        </>
    )
}

export const ProductSkeleton = () => {
    return (
        <Card>
            <CardHeader className="p-2">
                <AspectRatio ratio={1} className="relative">
                    <Skeleton className="w-full h-full" />
                </AspectRatio>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row justify-between md:items-center">
                <Skeleton className="w-full h-[1.6rem]" />
            </CardContent>
        </Card>
    )
}

export const ProductsSkeleton = () => {
    return (
        <section className="flex flex-col gap-2">
            <div className="flex gap-2 self-end">
                <Button variant={'outline'} size="icon" disabled>
                    <VscSettings />
                </Button>
                <Button variant={'outline'} size="icon" disabled>
                    <VscListFilter />
                </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <ProductSkeleton key={i} />
                ))}
            </div>
        </section>
    )
}

export const ProductDetailsSkeleton = () => {
    return (
        <>
            <section className="flex flex-col gap-2">
                <Skeleton className="w-full lg:w-1/3 h-[2.25rem]" />
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
                    <Card className="w-full max-w-screen-md p-2">
                        <Skeleton className="w-full aspect-square shadow rounded-xl" />
                    </Card>
                    <div className="flex flex-col lg:self-center gap-6 lg:gap-12">
                        <span className="text-4xl self-center">
                            <Skeleton className="w-24 h-[2.5rem]" />
                        </span>
                        <div className="flex flex-1 flex-col lg:flex-row gap-2">
                            <Button size={'lg'} variant={'outline'} disabled>
                                Add to cart
                            </Button>
                            <Button size={'lg'} disabled>
                                Buy now
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex flex-col gap-2">
                <Skeleton className="w-1/2 h-[1.75rem]" />
                <Skeleton className="w-full h-[3.5rem]" />
            </section>
        </>
    )
}
