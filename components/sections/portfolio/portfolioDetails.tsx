'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

import { useSuspenseQuery } from '@tanstack/react-query'
import { FacebookShareButton, PinterestShareButton, TwitterShareButton } from 'react-share'

import { client } from '@/sanity/lib/client'
import { PORTFOLIO } from '@/sanity/lib/queries'
import config from '@/lib/config.preval'
import { urlFor } from '@/sanity/lib/image'

import { Card } from '@/components/shadcn/card'
import PortfolioCarousel from './portfolioCarousel'
import { PortfolioCarouselSkeleton } from '@/components/layout/skeletons'

import { Product } from '@/sanity.types'
import { PortfolioType } from '@/types'

import { IoLogoFacebook, IoLogoPinterest } from 'react-icons/io5'
import { FaSquareXTwitter } from 'react-icons/fa6'

const PortfolioDetails = ({ id }: { id: string }) => {
    const [renderedIndices, setRenderedIndices] = useState<number[]>([0, 1])
    const loadersRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt((entry.target as HTMLElement).dataset.index || '0', 10)
                        setRenderedIndices((prev) => [...new Set([...prev, index])])
                    }
                })
            },
            { threshold: 1 }
        )

        const currentLoadersRef = loadersRef.current

        loadersRef.current.forEach((loader) => {
            if (loader) observer.observe(loader)
        })

        return () => {
            currentLoadersRef.forEach((loader) => {
                if (loader) observer.unobserve(loader)
            })
        }
    }, [])

    const { data: portfolio } = useSuspenseQuery({
        queryKey: ['portfolio', id],
        queryFn: () =>
            client.fetch<PortfolioType>(
                PORTFOLIO,
                { id },
                {
                    cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'force-cache',
                }
            ),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
    return (
        <>
            <section className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3 self-center w-full max-w-screen-lg">
                    <Card className="p-2 flex self-center sm:self-start shrink-0">
                        <Image
                            src={urlFor(portfolio.cover).width(150).height(150).url()}
                            alt={portfolio.title}
                            width={200}
                            height={200}
                            className="rounded-md"
                        />
                    </Card>
                    <div className="w-full flex flex-col gap-3 py-3">
                        <h2>
                            {portfolio.title} ({portfolio.count})
                        </h2>
                        <p className="lead">{portfolio.description}</p>
                        <div className="flex flex-row gap-2 mt-auto">
                            <FacebookShareButton url={`${config.siteUrl}/portfolio/${portfolio._id}`}>
                                <IoLogoFacebook className="text-2xl text-facebook" />
                            </FacebookShareButton>
                            <PinterestShareButton
                                url={`${config.siteUrl}/portfolio/${portfolio._id}`}
                                media={urlFor(portfolio.cover).url()}
                                openShareDialogOnClick
                            >
                                <IoLogoPinterest className="text-2xl text-pinterest" />
                            </PinterestShareButton>
                            <TwitterShareButton url={`${config.siteUrl}/product/${portfolio._id}`} openShareDialogOnClick>
                                <FaSquareXTwitter className="text-2xl text-black" />
                            </TwitterShareButton>
                        </div>
                    </div>
                </div>
            </section>
            {portfolio.products?.map((product: Product, index: number) => (
                <div
                    key={product._id}
                    ref={(el) => {
                        loadersRef.current[index] = el
                    }}
                    data-index={index}
                >
                    {renderedIndices.includes(index) ? <PortfolioCarousel product={product} /> : <PortfolioCarouselSkeleton />}
                </div>
            ))}
        </>
    )
}

export default PortfolioDetails
