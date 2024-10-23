"use client";

import { urlFor } from "@/sanity/lib/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./ui/carousel";
import Image from "next/image";
import config from "@/lib/config.preval";
import { formatCurrencyString } from "use-shopping-cart/core";
import { useShoppingCart } from "use-shopping-cart";
import { parseCartItem } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ProductType } from "@/types";

const ProductDetails = ({ product }: { product: ProductType }) => {
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
		<section className='flex flex-col gap-3'>
			<h2>{product.name}</h2>
			<div className='flex flex-col lg:flex-row gap-6 lg:gap-12'>
				<Carousel className='w-full h-full'>
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
				<div className='flex flex-col lg:self-center gap-6 lg:gap-12'>
					<span className='text-4xl self-center'>
						{formatCurrencyString({
							value: product.price,
							currency: config.currency,
						})}
					</span>
					<div className='flex flex-1 flex-col lg:flex-row gap-2'>
						<Button size={"lg"} variant={"outline"} onClick={() => handleAddItem()}>
							Add to cart
						</Button>
						<Button size={"lg"}>Buy now</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductDetails;
