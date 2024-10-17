import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
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
            <main className="container mx-auto flex flex-col gap-6">
                <h2>{product.name}</h2>
                <div className="flex gap-2">
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
                    <div className="flex flex-col flex-1 justify-center gap-12">
                        <div className="flex flex-col items-center">
                            <h2>420e</h2>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button size={"lg"} variant={"outline"}>Add to cart</Button>
                            <Button size={"lg"}>Buy now</Button>
                        </div>
                        <div className="flex justify-center gap-2">
                            socials
                        </div>
                    </div>
                </div>
                <Separator />
                <span className="lead">{product.description}</span>
            </main>
        </>
    )
}