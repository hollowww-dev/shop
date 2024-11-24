import PortfolioDisplay from "@/components/portfolio/portfolioDisplay";
import { PortfoliosSkeleton } from "@/components/skeletons";
import { Suspense } from "react";

export default async function Page() {
	return (
		<Suspense fallback={<PortfoliosSkeleton />}>
			<PortfolioDisplay />
		</Suspense>
	);
}
