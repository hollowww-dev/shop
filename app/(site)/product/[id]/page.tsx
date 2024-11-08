import ProductDetails, { ProductDetailsSkeleton } from "@/components/products/productDetails";
import configPreval from "@/lib/config.preval";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PRODUCT } from "@/sanity/lib/queries";
import { ProductType } from "@/types";
import type { Metadata } from "next";
import { Suspense } from "react";

async function getProduct(id: string) {
	const product = await client.fetch<ProductType>(
		PRODUCT,
		{ id },
		{
			cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
		}
	);
	if (process.env.NODE_ENV === "development") {
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}
	return product;
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;
	const productPromise = getProduct(id);

	return (
		<Suspense fallback={<ProductDetailsSkeleton />}>
			<ProductDetails productPromise={productPromise} />
		</Suspense>
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

	if (!product) {
		throw new Error("That product doesn't exist!");
	}

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
