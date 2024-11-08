"use client";

import { Button } from "../ui/button";
import { VscSettings, VscListFilter } from "react-icons/vsc";
import { Suspense, useState } from "react";
import { client } from "@/sanity/lib/client";
import { PRODUCTS } from "@/sanity/lib/queries";
import { ProductType } from "@/types";
import Product, { ProductSkeleton } from "./product";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "../ui/select";
import { useSuspenseQuery } from "@tanstack/react-query";

const ProductsSkeleton = () => {
	return (
		<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-3'>
			{Array.from({ length: 3 }).map((_, i) => (
				<ProductSkeleton key={i} />
			))}
		</div>
	);
};

const Products = ({ orderBy, order }: { orderBy: "date" | "price"; order: "ascending" | "descending" }) => {
	const { data: products } = useSuspenseQuery({
		queryKey: ["products"],
		queryFn: () =>
			client.fetch<ProductType[]>(
				PRODUCTS,
				{},
				{ cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache" }
			),
	});

	const orderProducts = (products: ProductType[]) => {
		switch (orderBy) {
			case "price":
				switch (order) {
					case "ascending":
						return products.sort((a, b) => a.price - b.price);
					case "descending":
						return products.sort((a, b) => b.price - a.price);
				}
			case "date":
				switch (order) {
					case "ascending":
						return products.sort((a, b) => (new Date(a._createdAt) < new Date(b._createdAt) ? 1 : -1));
					case "descending":
						return products.sort((a, b) => (new Date(a._createdAt) > new Date(b._createdAt) ? 1 : -1));
				}
		}
	};

	return (
		<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-3'>
			{orderProducts(products).map((product) => (
				<Product key={product._id} product={product} />
			))}
		</div>
	);
};

const ProductsDisplay = () => {
	const [orderBy, setOrderBy] = useState<"price" | "date">("date");
	const [order, setOrder] = useState<"ascending" | "descending">("descending");
	return (
		<section className='flex flex-col gap-2'>
			<div className='flex gap-2 self-end'>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant={"outline"} size='icon'>
							<VscSettings />
						</Button>
					</PopoverTrigger>
					<PopoverContent align='end'></PopoverContent>
				</Popover>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant={"outline"} size='icon'>
							<VscListFilter />
						</Button>
					</PopoverTrigger>
					<PopoverContent align='end' className='flex flex-col gap-3'>
						<Select value={orderBy} onValueChange={(value: "price" | "date") => setOrderBy(value)}>
							<SelectTrigger className='w-full'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='date'>Date</SelectItem>
								<SelectItem value='price'>Price</SelectItem>
							</SelectContent>
						</Select>
						<Select value={order} onValueChange={(value: "descending" | "ascending") => setOrder(value)}>
							<SelectTrigger className='w-full'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='descending'>Descending</SelectItem>
								<SelectItem value='ascending'>Ascending</SelectItem>
							</SelectContent>
						</Select>
					</PopoverContent>
				</Popover>
			</div>
			<Suspense fallback={<ProductsSkeleton />}>
				<Products order={order} orderBy={orderBy} />
			</Suspense>
		</section>
	);
};

export default ProductsDisplay;
