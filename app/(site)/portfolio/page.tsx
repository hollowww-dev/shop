import { Suspense } from "react";

import PortfolioDisplay from "@/components/portfolio/portfolioDisplay";
import { PortfoliosSkeleton } from "@/components/skeletons";

export default async function Page() {
	return (
		<Suspense fallback={<PortfoliosSkeleton />}>
			<PortfolioDisplay />
		</Suspense>
	);
}
