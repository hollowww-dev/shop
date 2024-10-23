"use client";

import { PRODUCTSResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { formatCurrencyString } from "use-shopping-cart/core";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import config from "@/lib/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Product = ({ product }: { product: PRODUCTSResult[number] }) => {
	const router = useRouter();
	useEffect(() => {
		router.prefetch(`${config.siteUrl}/product/${product.id}`);
	}, [router, product.id]);

	return (
		<Card
			key={product.id}
			className='relative active:shadow-none transition-shadow cursor-pointer'
			onClick={() => router.push(`${config.siteUrl}/product/${product.id}`)}
		>
			<CardHeader>
				<AspectRatio ratio={1} className='relative'>
					<Image
						src={urlFor(product.image).width(300).height(300).url()}
						alt={product.name}
						className='aspect-square object-cover rounded-md'
						fill
					/>
				</AspectRatio>
			</CardHeader>
			<CardContent className='flex justify-between items-center gap-3'>
				<h4>{product.name}</h4>
				<Badge variant='outline'>
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
