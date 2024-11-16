"use client";

import { Button } from "../ui/button";
import { VscSettings, VscListFilter } from "react-icons/vsc";
import { Suspense, useEffect, useState, useTransition } from "react";
import { client } from "@/sanity/lib/client";
import { PRODUCTS, PRODUCTS_CATEGORY } from "@/sanity/lib/queries";
import { ProductType } from "@/types";
import Product from "./product";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "../ui/select";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ProductsSkeleton } from "../skeletons";
import { groq } from "next-sanity";

const Products = ({
	orderBy,
	order,
	category,
}: {
	orderBy: "price";
	order: "ascending" | "descending";
	category: string;
}) => {
	const [_isPending, startTransition] = useTransition();
	const orderProducts = (products: ProductType[]) => {
		switch (orderBy) {
			case "price":
				switch (order) {
					case "ascending":
						return products.sort((a, b) => a.price - b.price);
					case "descending":
						return products.sort((a, b) => b.price - a.price);
				}
		}
	};

	const { data: products, refetch } = useSuspenseQuery({
		queryKey: ["products"],
		queryFn: () =>
			client.fetch<ProductType[]>(
				category === "all" ? PRODUCTS : PRODUCTS_CATEGORY,
				{ category },
				{ cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache" }
			),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});
	useEffect(() => {
		startTransition(() => {
			refetch();
		});
	}, [category]);

	const orderedProducts = orderProducts(products);

	return (
		<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-3'>
			{orderedProducts.map((product) => (
				<Product key={product._id} product={product} />
			))}
		</div>
	);
};

const ProductsDisplay = () => {
	const [orderBy, setOrderBy] = useState<"price">("price");
	const [order, setOrder] = useState<"ascending" | "descending">("descending");
	const [categoryFilter, setCategoryFilter] = useState<string>("all");
	const { data: categories } = useSuspenseQuery({
		queryKey: ["categories"],
		queryFn: () => client.fetch(groq`array::unique(*[_type == "product"].category)`),
	});
	return (
		<section className='flex flex-col gap-2'>
			<div className='flex gap-2 self-end'>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant={"outline"} size='icon'>
							<VscSettings />
						</Button>
					</PopoverTrigger>
					<PopoverContent align='end'>
						<Select value={categoryFilter} onValueChange={(value: string) => setCategoryFilter(value)}>
							<SelectTrigger className='w-full'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={"all"}>All</SelectItem>
								{categories &&
									categories.map((category: string, i: number) => (
										<SelectItem value={category} key={i}>
											{category}
										</SelectItem>
									))}
							</SelectContent>
						</Select>
					</PopoverContent>
				</Popover>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant={"outline"} size='icon'>
							<VscListFilter />
						</Button>
					</PopoverTrigger>
					<PopoverContent align='end' className='flex flex-col gap-3'>
						<Select value={orderBy} onValueChange={(value: "price") => setOrderBy(value)}>
							<SelectTrigger className='w-full'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
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
				<Products order={order} orderBy={orderBy} category={categoryFilter} />
			</Suspense>
		</section>
	);
};

export default ProductsDisplay;
