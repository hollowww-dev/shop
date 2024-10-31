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
import { useState } from "react";
import { createCheckoutSession } from "@/actions";

const ProductDetails = ({ product }: { product: ProductType }) => {
	const [isLoading, setLoading] = useState(false);
	const { addItem, cartDetails, decrementItem, redirectToCheckout } = useShoppingCart();
	const { toast } = useToast();

	const handleAddItem = () => {
		const parsedCartItem = parseCartItem(product);
		addItem(parsedCartItem);
		toast({
			title: `"${product.name}" has been added to your cart.`,
			description: "Thank you for supporting me!",
		});
	};

	const handleBuyNow = async () => {
		try {
			const parsedCartItem = parseCartItem(product);
			addItem(parsedCartItem);
			setLoading(true);
			if (!cartDetails) {
				throw new Error("Cart is empty.");
			}
			const { sessionId } = await createCheckoutSession(cartDetails);
			redirectToCheckout(sessionId);
		} catch (error) {
			setLoading(false);
			decrementItem(product._id);
			if (error instanceof Error) {
				console.log(error);
				toast({ title: "Something went wrong.", description: error.message, variant: "destructive" });
			}
		}
	};

	return (
		<section className='flex flex-col gap-2'>
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
														loading='lazy'
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
						<Button size={"lg"} onClick={async () => await handleBuyNow()} disabled={isLoading}>
							{isLoading ? "Buying..." : "Buy now"}
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductDetails;
