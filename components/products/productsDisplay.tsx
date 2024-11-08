"use client";

import { Button } from "../ui/button";
import { IoFilter } from "react-icons/io5";
import { Suspense, use, useState } from "react";
import { client } from "@/sanity/lib/client";
import { PRODUCTS } from "@/sanity/lib/queries";
import { ProductType } from "@/types";
import Product, { ProductSkeleton } from "./product";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

async function getProducts() {
	const products = await client.fetch<ProductType[]>(
		PRODUCTS,
		{},
		{ cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache" }
	);
	if (process.env.NODE_ENV === "development") {
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}
	return products;
}

const ProductsSkeleton = () => {
	return (
		<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-3'>
			{Array.from({ length: 3 }).map((_, i) => (
				<ProductSkeleton key={i} />
			))}
		</div>
	);
};

const Products = ({ products }: { products: Promise<ProductType[]> }) => {
	const productsArray = use(products);

	if (!productsArray) {
		throw new Error("Error while gathering products from the server. Try again.");
	}

	return (
		<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-3'>
			{productsArray.map((product) => (
				<Product key={product._id} product={product} />
			))}
		</div>
	);
};

const ProductsDisplay = () => {
	const [filters, setFilters] = useState([]);
	const products = getProducts();
	return (
		<section className='flex flex-col gap-2'>
			<Popover>
				<PopoverTrigger asChild>
					<Button className='flex self-end' variant={"outline"} size='icon'>
						<IoFilter />
					</Button>
				</PopoverTrigger>
				<PopoverContent align='end'>
					<h4>Filter</h4>
				</PopoverContent>
			</Popover>
			<Suspense fallback={<ProductsSkeleton />}>
				<Products products={products} />
			</Suspense>
		</section>
	);
};

export default ProductsDisplay;
