import { client } from "@/sanity/lib/client";
import { PRODUCTS } from "@/sanity/lib/queries";
import { ProductType } from "@/types";
import Product, { ProductSkeleton } from "./product";

const Products = ({ products }: { products: ProductType[] }) => {
	return (
		<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-3'>
			{products.map((product) => (
				<Product key={product._id} product={product} />
			))}
		</div>
	);
};

export const ProductsSkeleton = () => {
	return (
		<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-3'>
			{Array.from({ length: 3 }).map((_, i) => (
				<ProductSkeleton key={i} />
			))}
		</div>
	);
};

export default async function ProductsLoader() {
	const products = await client.fetch<Promise<ProductType[]>>(
		PRODUCTS,
		{},
		{ cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache" }
	);
	if (process.env.NODE_ENV === "development") {
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}

	return <Products products={products} />;
}
