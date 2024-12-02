import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { groq } from 'next-sanity'

import Footer from '@/components/layout/footer'
import Providers from './providers'

import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import config from '@/lib/config.preval'

import { ProductType } from '@/types'

import './globals.css'

const geistSans = localFont({
    src: '../../fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
})
const geistMono = localFont({
    src: '../../fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
})

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-svh`}>
                <Providers>
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}

export async function generateMetadata(): Promise<Metadata> {
    const product: { image: ProductType['image'] } = await client.fetch(
        groq`*[_type == "product"][0]{image}`,
        {},
        {
            cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'force-cache',
        }
    )

    return {
        title: `${config.title}`,
        description: `${config.description}`,
        openGraph: {
            title: `${config.title}`,
            description: `${config.description}`,
            images: [urlFor(product.image).width(1200).height(630).url()],
            url: `${config.siteUrl}`,
            type: 'website',
        },
    }
}
