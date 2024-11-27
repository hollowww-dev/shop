import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { getQueryClient } from "@/lib/queryClient";

export default async function Page() {
	const queryClient = getQueryClient();

	return <HydrationBoundary state={dehydrate(queryClient)}></HydrationBoundary>;
}
