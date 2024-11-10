"use client";

import { urlFor } from "@/sanity/lib/image";
import { formatCurrencyString } from "use-shopping-cart/core";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import config from "@/lib/config.preval";
import { ProductType } from "@/types";
import { Product as ProductSanity } from "@/sanity.types";
import Link from "next/link";

const Product = ({ product }: { product: ProductType | ProductSanity }) => {
	return (
		<Link href={`${config.siteUrl}/product/${product._id}`} prefetch={true}>
			<Card key={product._id} className='relative active:shadow-none transition-shadow cursor-pointer'>
				<CardHeader>
					<AspectRatio ratio={1} className='relative'>
						<Image
							src={urlFor(product.image).width(300).height(300).url()}
							placeholder='blur'
							blurDataURL={urlFor(product.image).width(24).height(24).blur(10).url()}
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
		</Link>
	);
};

export default Product;
