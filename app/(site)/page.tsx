import { getQueryClient } from "@/lib/queryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function Page() {
	const queryClient = getQueryClient();


	return (
		<HydrationBoundary state={dehydrate(queryClient)}>

		</HydrationBoundary>
	);
}
