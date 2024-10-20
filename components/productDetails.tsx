"use client";

import { PRODUCTResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./ui/carousel";
import Image from "next/image";
import config from "@/lib/config";
import { formatCurrencyString } from "use-shopping-cart/core";
import { useShoppingCart } from "use-shopping-cart";
import { parseCartItem } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { IoLogoFacebook, IoLogoInstagram, IoLogoPinterest } from "react-icons/io5";

const ProductDetails = ({ product }: { product: PRODUCTResult }) => {
	const { addItem } = useShoppingCart();
	const { toast } = useToast();

	const handleAddItem = () => {
		const parsedCartItem = parseCartItem(product);
		addItem(parsedCartItem);
		toast({
			title: `"${product.name}" has been added to your cart.`,
			description: "Thank you for supporting us!",
		});
	};

	return (
		<div className='flex gap-2'>
			<Carousel className='w-full h-full max-w-xl'>
				<Card className='overflow-hidden'>
					<CardContent className='p-0'>
						<CarouselContent>
							{[product.image, ...(product.gallery || [])].map(
								(item, index) =>
									item && (
										<CarouselItem key={index}>
											<AspectRatio ratio={1}>
												<Image
													src={urlFor(item).width(800).height(800).url()}
													alt={product.name}
													fill
												/>
											</AspectRatio>
										</CarouselItem>
									)
							)}
						</CarouselContent>
					</CardContent>
				</Card>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			<div className='flex flex-col flex-1 justify-center gap-12'>
				<div className='flex justify-center gap-2'>
					<IoLogoFacebook className='text-2xl text-foreground/80 hover:text-foreground cursor-pointer' />
					<IoLogoInstagram className='text-2xl text-foreground/80 hover:text-foreground cursor-pointer' />
					<IoLogoPinterest className='text-2xl text-foreground/80 hover:text-foreground cursor-pointer' />
				</div>
				<div className='flex flex-col items-center'>
					<span className='text-4xl'>
						{formatCurrencyString({
							value: product.price,
							currency: config.currency,
						})}
					</span>
				</div>
				<div className='flex flex-col gap-2'>
					<Button size={"lg"} variant={"outline"} onClick={() => handleAddItem()}>
						Add to cart
					</Button>
					<Button size={"lg"}>Buy now</Button>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
