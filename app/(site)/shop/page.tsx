import ProductsDisplay from "@/components/products/productsDisplay";
import { ProductsSkeleton } from "@/components/skeletons";
import { Suspense } from "react";

export default function Page() {
	return (
		<Suspense fallback={<ProductsSkeleton />}>
			<ProductsDisplay />
		</Suspense>
	);
}
