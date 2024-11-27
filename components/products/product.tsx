import Image from "next/image";
import Link from "next/link";

import { formatCurrencyString } from "use-shopping-cart/core";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { urlFor } from "@/sanity/lib/image";
import config from "@/lib/config.preval";

import { ProductType } from "@/types";
import { Product as ProductSanity } from "@/sanity.types";

const Product = ({ product }: { product: ProductType | ProductSanity }) => {
	return (
		<Link href={`${config.siteUrl}/shop/${product._id}`} prefetch={true} className='no-underline'>
			<Card className='relative active:shadow-none transition-shadow cursor-pointer'>
				<CardHeader className='p-2 pb-0'>
					<AspectRatio ratio={1} className='relative'>
						<Image
							src={urlFor(product.image).width(300).height(300).url()}
							placeholder='blur'
							blurDataURL={urlFor(product.image).width(24).height(24).blur(10).url()}
							alt={product.name}
							className='aspect-square object-cover rounded-md'
							loading='lazy'
							unoptimized
							fill
						/>
					</AspectRatio>
				</CardHeader>
				<CardContent className='flex flex-col md:flex-row justify-between md:items-center gap-1 lg:gap-2 py-2'>
					<h4 className='line-clamp-1'>{product.name}</h4>
					<Badge variant='outline' className='self-center lg:self-start'>
						{formatCurrencyString({ value: product.price, currency: config.currency })}
					</Badge>
				</CardContent>
			</Card>
		</Link>
	);
};

export default Product;
