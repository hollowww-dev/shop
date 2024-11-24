"use client";

import { Button } from "../ui/button";
import { VscSettings, VscListFilter } from "react-icons/vsc";
import { useEffect, useState, useTransition } from "react";
import { client } from "@/sanity/lib/client";
import { ProductType } from "@/types";
import Product from "./product";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "../ui/select";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { groq } from "next-sanity";

const Products = ({
	orderBy,
	order,
	category,
	filters,
}: {
	orderBy: "price";
	order: "ascending" | "descending";
	category: string;
	filters: Map<string, string>;
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
				groq`*[_type == "product" && stock > 0${category !== "all" ? ` && category == "${category}"` : ""}${Array.from(
					[...filters]
				)
					.map((filter) => ` && "${filter[1]}" in details[detail == "${filter[0]}"].answer`)
					.join("")}]{
    					_id,
    					name,
    					image,
    					category,
    					'price': price * 100,
					}`,
				{},
				{ cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache" }
			),
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});
	useEffect(() => {
		startTransition(() => {
			refetch();
		});
	}, [category, filters]);

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
	const [activeFilters, setActiveFilters] = useState<Map<string, string>>(new Map());
	const { data: categories } = useSuspenseQuery({
		queryKey: ["categories"],
		queryFn: () =>
			client.fetch(
				groq`array::unique(*[_type == "product" && stock > 0].category)`,
				{},
				{ cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache" }
			),
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});
	const { data: filters, isLoading: filtersFetching } = useQuery({
		queryKey: ["filters", categoryFilter],
		queryFn: () =>
			client
				.fetch(
					groq`*[_type == "product"${categoryFilter !== "all" ? ` && category == "${categoryFilter}"` : ""}].details[]{
    						"detail": detail,
							"answers": array::unique(*[_type == "product"${categoryFilter !== "all" ? ` && category == "${categoryFilter}"` : ""}].details[detail == ^.detail].answer)
  						}`,
					{},
					{ cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache" }
				)
				.then((results: { detail: string; answers: string[] }[]) =>
					Array.from(new Set(results.map((d) => d.detail))).map((detail) => ({
						detail,
						answers: Array.from(
							new Set(results.filter((d) => d.detail === detail).flatMap((d) => d.answers))
						),
					}))
				),
		enabled: categoryFilter !== "all",
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
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
					<PopoverContent align='end' className='flex flex-col gap-3'>
						<Select
							value={categoryFilter}
							onValueChange={(value: string) => {
								setCategoryFilter(value);
								setActiveFilters(new Map());
							}}
							disabled={filtersFetching}
						>
							<SelectTrigger className='w-full gap-2'>
								<span className='muted'>Category:</span>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={"all"}>All</SelectItem>
								{categories.map((category: string, i: number) => (
									<SelectItem value={category} key={i}>
										{category}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{!filters ?
							<p className='muted text-center py-2'>Pick a category to see more filters</p>
						:	filters.map((filter) => (
								<Select
									key={filter.detail}
									value={activeFilters.get(filter.detail) || "all"}
									onValueChange={(value: string) =>
										value !== "all" ?
											setActiveFilters((prev) => new Map([...prev, [filter.detail, value]]))
										:	setActiveFilters(
												(prev) => new Map([...prev].filter(([k, _v]) => k !== filter.detail))
											)
									}
								>
									<SelectTrigger className='w-full gap-2'>
										<span className='muted'>{filter.detail}:</span>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value={"all"}>All</SelectItem>
										{filter.answers.map((answer, i) => (
											<SelectItem value={answer} key={i}>
												{answer}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							))
						}
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
							<SelectTrigger className='w-full gap-2'>
								<span className='muted'>Sort by:</span>
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
								<SelectItem value='descending'>Highest to lowest</SelectItem>
								<SelectItem value='ascending'>Lowest to highest</SelectItem>
							</SelectContent>
						</Select>
					</PopoverContent>
				</Popover>
			</div>
			<Products order={order} orderBy={orderBy} category={categoryFilter} filters={activeFilters} />
		</section>
	);
};

export default ProductsDisplay;
