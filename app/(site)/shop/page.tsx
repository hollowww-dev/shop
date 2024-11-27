import { Suspense } from "react";

import ProductsDisplay from "@/components/sections/shop/productsDisplay";
import { ProductsSkeleton } from "@/components/layout/skeletons";

export default function Page() {
	return (
		<Suspense fallback={<ProductsSkeleton />}>
			<ProductsDisplay />
		</Suspense>
	);
}
