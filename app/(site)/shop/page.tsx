import { Suspense } from "react";

import ProductsDisplay from "@/components/products/productsDisplay";
import { ProductsSkeleton } from "@/components/skeletons";

export default function Page() {
	return (
		<Suspense fallback={<ProductsSkeleton />}>
			<ProductsDisplay />
		</Suspense>
	);
}
