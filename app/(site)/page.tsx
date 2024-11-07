import { client } from "@/sanity/lib/client";
import { PRODUCTS } from "@/sanity/lib/queries";
import { ProductType } from "@/types";
import { Suspense } from "react";
import ProductDisplay, { ProductDisplaySkeleton } from "@/components/productsDisplay";

async function ProductDisplayLoader() {
	const products = await client.fetch<Promise<ProductType[]>>(
		PRODUCTS,
		{},
		{ cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache" }
	);

	return <ProductDisplay products={products} />;
}

export default async function Home() {
	return (
		<>
			<main className='container mx-auto'>
				<Suspense fallback={<ProductDisplaySkeleton />}>
					<ProductDisplayLoader />
				</Suspense>
			</main>
		</>
	);
}
