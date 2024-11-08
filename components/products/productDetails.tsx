"use client";

import { urlFor } from "@/sanity/lib/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Image from "next/image";
import config from "@/lib/config.preval";
import { formatCurrencyString } from "use-shopping-cart/core";
import { useShoppingCart } from "use-shopping-cart";
import { parseCartItem } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ProductType } from "@/types";
import { FacebookShareButton, PinterestShareButton, TwitterShareButton } from "react-share";
import { IoLogoFacebook, IoLogoPinterest } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableRow, TableCell } from "../ui/table";
import Product from "./product";
import { use } from "react";

export const ProductDetailsSkeleton = () => {
	return (
		<section className='flex flex-col gap-2'>
			<Skeleton className='w-1/3 h-[2.25rem]' />
			<div className='flex flex-col lg:flex-row gap-6 lg:gap-12'>
				<Skeleton className='w-full aspect-square shadow rounded-xl' />
				<div className='flex flex-col lg:self-center gap-6 lg:gap-12'>
					<span className='text-4xl self-center'>
						<Skeleton className='w-24 h-[2.5rem]' />
					</span>
					<div className='flex flex-1 flex-col lg:flex-row gap-2'>
						<Button size={"lg"} variant={"outline"} disabled>
							Add to cart
						</Button>
						<Button size={"lg"} disabled>
							Buy now
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

const ProductDetails = ({ productPromise }: { productPromise: Promise<ProductType> }) => {
	const product = use(productPromise);
	const { addItem, handleCartClick } = useShoppingCart();
	const { toast } = useToast();

	if (!product) {
		if (!product) {
			throw new Error("That product doesn't exist!");
		}
	}

	const handleAddItem = () => {
		const parsedCartItem = parseCartItem(product);
		addItem(parsedCartItem);
		toast({
			title: `"${product.name}" has been added to your cart.`,
			description: "Thank you for supporting me!",
		});
	};

	const handleBuyNow = () => {
		const parsedCartItem = parseCartItem(product);
		addItem(parsedCartItem);
		handleCartClick();
	};

	return (
		<>
			<section className='flex flex-col gap-2'>
				<div className='flex flex-row gap-6 items-center'>
					<h2>{product.name}</h2>
					<div className='flex flex-row gap-2'>
						<FacebookShareButton url={`${config.siteUrl}/product/${product._id}`}>
							<IoLogoFacebook className='text-2xl text-facebook' />
						</FacebookShareButton>
						<PinterestShareButton
							url={`${config.siteUrl}/product/${product._id}`}
							media={urlFor(product.image).url()}
							openShareDialogOnClick
						>
							<IoLogoPinterest className='text-2xl text-pinterest' />
						</PinterestShareButton>
						<TwitterShareButton url={`${config.siteUrl}/product/${product._id}`} openShareDialogOnClick>
							<FaSquareXTwitter className='text-2xl text-black' />
						</TwitterShareButton>
					</div>
				</div>
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
															placeholder='blur'
															blurDataURL={urlFor(item)
																.width(24)
																.height(24)
																.blur(10)
																.url()}
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
							<Button size={"lg"} onClick={async () => handleBuyNow()}>
								Buy now
							</Button>
						</div>
					</div>
				</div>
			</section>
			<section className='flex flex-col gap-2'>
				<h3>Description</h3>
				<p className='lead'>{product.description}</p>
			</section>
			{product.details && (
				<section className='flex flex-col gap-2'>
					<h3>Details</h3>
					<Table>
						<TableBody>
							{product.details.map((detail) => (
								<TableRow key={detail._key}>
									<TableCell className='font-medium w-1/3'>{detail.detail}</TableCell>
									<TableCell className='w-2/3'>{detail.answer}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</section>
			)}
			{product.featured && (
				<section className='flex flex-col gap-2'>
					<h3>Featured products</h3>
					<Carousel className="className='w-full h-full'">
						<CarouselContent className='m-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
							{product.featured.map((product) => (
								<Product product={product} key={product._id} />
							))}
						</CarouselContent>
					</Carousel>
				</section>
			)}
		</>
	);
};

export default ProductDetails;