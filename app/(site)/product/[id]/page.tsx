import Product from "@/components/product";
import ProductDetails from "@/components/productDetails";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import configPreval from "@/lib/config.preval";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PRODUCT } from "@/sanity/lib/queries";
import { ProductType } from "@/types";
import type { Metadata } from "next";

export default async function Page(props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;

	const product: ProductType = await client.fetch(
		PRODUCT,
		{ id },
		{
			cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
		}
	);

	if (!product) {
		return (
			<>
				<main className='container mx-auto'>
					<h2>Something went wrong.</h2>
					<p>We couldn&apos;t find a product you are looking for.</p>
				</main>
			</>
		);
	}

	return (
		<main className='container mx-auto flex flex-col gap-6 lg:gap-12'>
			<ProductDetails product={product} />
			<section className='flex flex-col gap-2'>
				<h3>Description</h3>
				<p className='lead'>{product.description}</p>
			</section>
			{product.details && (
				<div className='flex flex-col gap-2'>
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
				</div>
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
		</main>
	);
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
	const { id } = await props.params;

	const product: ProductType = await client.fetch(
		PRODUCT,
		{ id },
		{
			cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
		}
	);

	return {
		title: `${product.name} | ${configPreval.title}`,
		openGraph: {
			images: [urlFor(product.image).width(1200).height(630).url()],
			title: `${product.name} | ${configPreval.title}`,
			description: product.description,
			url: `${configPreval.siteUrl}/product/${product._id}`,
			type: "website",
		},
	};
}
