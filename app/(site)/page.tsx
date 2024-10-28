import { client } from "@/sanity/lib/client";
import { PRODUCTS } from "@/sanity/lib/queries";
import Product from "@/components/product";
import { ProductType } from "@/types";

export default async function Home() {
	const products = await client.fetch<Promise<ProductType[]>>(
		PRODUCTS,
		{},
		{ cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache" }
	);
	return (
		<>
			<main className='container mx-auto'>
				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-3'>
					{products.map((product) => (
						<Product key={product._id} product={product} />
					))}
				</div>
			</main>
		</>
	);
}
