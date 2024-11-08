import ProductsDisplay from "@/components/products/productsDisplay";
import { getQueryClient } from "@/lib/queryClient";
import { client } from "@/sanity/lib/client";
import { PRODUCTS } from "@/sanity/lib/queries";
import { ProductType } from "@/types";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function Page() {
	const queryClient = getQueryClient();

	queryClient.prefetchQuery({
		queryKey: ["products"],
		queryFn: () =>
			client.fetch<ProductType[]>(
				PRODUCTS,
				{},
				{ cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache" }
			),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ProductsDisplay />
		</HydrationBoundary>
	);
}
