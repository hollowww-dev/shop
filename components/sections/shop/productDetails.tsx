'use client'

import Image from 'next/image'

import { useShoppingCart } from 'use-shopping-cart'
import { formatCurrencyString } from 'use-shopping-cart/core'
import { useSuspenseQuery } from '@tanstack/react-query'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { FacebookShareButton, PinterestShareButton, TwitterShareButton } from 'react-share'

import { Button } from '@/components/shadcn/button'
import { Card, CardContent } from '@/components/shadcn/card'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/shadcn/carousel'
import { Table, TableBody, TableRow, TableCell } from '@/components/shadcn/table'
import Product from './product'

import { urlFor } from '@/sanity/lib/image'
import config from '@/lib/config.preval'
import { parseCartItem } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { client } from '@/sanity/lib/client'
import { PRODUCT } from '@/sanity/lib/queries'

import { ProductType } from '@/types'

import { IoLogoFacebook, IoLogoPinterest } from 'react-icons/io5'
import { FaSquareXTwitter } from 'react-icons/fa6'

const ProductDetails = ({ id }: { id: string }) => {
    const { data: product } = useSuspenseQuery({
        queryKey: ['product', id],
        queryFn: () =>
            client.fetch<ProductType>(
                PRODUCT,
                { id },
                {
                    cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'force-cache',
                }
            ),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
    const { addItem, handleCartClick } = useShoppingCart()
    const { toast } = useToast()

    const handleAddItem = () => {
        const parsedCartItem = parseCartItem(product)
        addItem(parsedCartItem)
        toast({
            title: `"${product.name}" has been added to your cart.`,
            description: 'Thank you for supporting me!',
        })
    }

    const handleBuyNow = () => {
        const parsedCartItem = parseCartItem(product)
        addItem(parsedCartItem)
        handleCartClick()
    }

    return (
        <>
            <section className="flex flex-col gap-2">
                <div className="flex flex-row gap-6 items-center">
                    <h2>{product.name}</h2>
                    <div className="flex flex-row gap-2">
                        <FacebookShareButton url={`${config.siteUrl}/product/${product._id}`}>
                            <IoLogoFacebook className="text-2xl text-facebook" />
                        </FacebookShareButton>
                        <PinterestShareButton url={`${config.siteUrl}/product/${product._id}`} media={urlFor(product.image).url()} openShareDialogOnClick>
                            <IoLogoPinterest className="text-2xl text-pinterest" />
                        </PinterestShareButton>
                        <TwitterShareButton url={`${config.siteUrl}/product/${product._id}`} openShareDialogOnClick>
                            <FaSquareXTwitter className="text-2xl text-black" />
                        </TwitterShareButton>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
                    <Card className="w-full max-w-screen-md p-2">
                        <Carousel className="rounded-md overflow-hidden">
                            <CardContent className="p-0">
                                <CarouselContent>
                                    {[product.image, ...(product.gallery || [])].map(
                                        (item, index) =>
                                            item && (
                                                <CarouselItem key={index}>
                                                    <AspectRatio ratio={1}>
                                                        <Image
                                                            src={urlFor(item).width(800).height(800).url()}
                                                            alt={product.name}
                                                            loading="lazy"
                                                            placeholder="blur"
                                                            blurDataURL={urlFor(item).width(24).height(24).blur(10).url()}
                                                            className="rounded-md"
                                                            unoptimized
                                                            fill
                                                        />
                                                    </AspectRatio>
                                                </CarouselItem>
                                            )
                                    )}
                                </CarouselContent>
                            </CardContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </Card>
                    <div className="flex flex-1 flex-col lg:items-center lg:self-center gap-6 lg:gap-12">
                        <span className="text-4xl self-center">
                            {formatCurrencyString({
                                value: product.price,
                                currency: config.currency,
                            })}
                        </span>
                        <div className="flex flex-1 flex-col lg:flex-row gap-2">
                            <Button size={'lg'} variant={'outline'} onClick={() => handleAddItem()}>
                                Add to cart
                            </Button>
                            <Button size={'lg'} onClick={async () => handleBuyNow()}>
                                Buy now
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex flex-col gap-2">
                <h3>Description</h3>
                <p className="lead">{product.description}</p>
            </section>
            {product.details && (
                <section className="flex flex-col gap-2">
                    <h3>Details</h3>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium w-1/3">Category</TableCell>
                                <TableCell className="w-2/3">{product.category}</TableCell>
                            </TableRow>
                            {product.details.map((detail) => (
                                <TableRow key={detail._key}>
                                    <TableCell className="font-medium w-1/3">{detail.detail}</TableCell>
                                    <TableCell className="w-2/3">{detail.answer}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>
            )}
            {product.featured && (
                <section className="flex flex-col gap-2">
                    <h3>Featured products</h3>
                    <Carousel className="className='w-full h-full'">
                        <CarouselContent className="m-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {product.featured.map((product) => (
                                <Product product={product} key={product._id} />
                            ))}
                        </CarouselContent>
                    </Carousel>
                </section>
            )}
        </>
    )
}

export default ProductDetails
