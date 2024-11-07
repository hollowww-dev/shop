"use client";

import { urlFor } from "@/sanity/lib/image";
import { formatCurrencyString } from "use-shopping-cart/core";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import config from "@/lib/config.preval";
import { useRouter } from "next/navigation";
import { ProductType } from "@/types";
import { Product as ProductSanity } from "@/sanity.types";
import { useEffect } from "react";
import { Skeleton } from "./ui/skeleton";

export const ProductSkeleton = () => {
	return (
		<Card>
			<CardHeader>
				<AspectRatio ratio={1} className='relative'>
					<Skeleton className='w-full h-full' />
				</AspectRatio>
			</CardHeader>
			<CardContent className='flex flex-col md:flex-row justify-between md:items-center gap-1 lg:gap-2'>
				<Skeleton className='w-full h-[1.75rem]' />
			</CardContent>
		</Card>
	);
};

const Product = ({ product }: { product: ProductType | ProductSanity }) => {
	const router = useRouter();
	useEffect(() => {
		router.prefetch(`${config.siteUrl}/product/${product._id}`);
	}, [product._id, router]);

	return (
		<Card
			key={product._id}
			className='relative active:shadow-none transition-shadow cursor-pointer'
			onClick={() => router.push(`${config.siteUrl}/product/${product._id}`)}
		>
			<CardHeader>
				<AspectRatio ratio={1} className='relative'>
					<Image
						src={urlFor(product.image).width(300).height(300).url()}
						alt={product.name}
						className='aspect-square object-cover rounded-md'
						loading='lazy'
						fill
					/>
				</AspectRatio>
			</CardHeader>
			<CardContent className='flex flex-col md:flex-row justify-between md:items-center gap-1 lg:gap-2'>
				<h4>{product.name}</h4>
				<Badge variant='outline' className='self-center'>
					{formatCurrencyString({ value: product.price, currency: config.currency })}
				</Badge>
			</CardContent>
			<Badge variant={product.available ? "secondary" : "default"} className='absolute top-5 right-5'>
				{product.available ? "Available" : "Sold"}
			</Badge>
		</Card>
	);
};

export default Product;
