import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { PRODUCTResult } from "@/sanity.types";
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image";
import { PRODUCT } from "@/sanity/lib/queries"
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

export default async function Page({params: {id}}: {params: {id: string}}) {
    const product = await client.fetch(PRODUCT, {id}, {cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache"}) as PRODUCTResult;
    
    if(!product) {
        return (
            <>
                <main className="container mx-auto">
                    <h2>Something went wrong.</h2>
                    <p>We couldn&apos;t find a product you are looking for.</p>
                </main>
            </>
        )
    }

    return (
        <>
            <main className="container mx-auto flex flex-col gap-2">
                <h2>{product.name}</h2>
                <Carousel className="w-full h-full max-w-xl">
                <Card className="overflow-hidden">
                <CardContent className="p-0">
                    <CarouselContent>
                        {[product.image, ...(product.gallery || [])].map((item, index) => (
                            item && (                
                            <CarouselItem key={index}>
                                <AspectRatio ratio={1}>
                                    <Image src={urlFor(item).width(800).height(800).url()} alt={product.name} fill />
                                </AspectRatio>
                            </CarouselItem>)
                        ))}
                    </CarouselContent>
                    </CardContent>
                    </Card>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </main>
        </>
    )
}