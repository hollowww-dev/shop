import { Button } from "../ui/button";
import { IoFilter } from "react-icons/io5";
import { Suspense } from "react";
import ProductsLoader, { ProductsSkeleton } from "./products";

export const ProductsDisplay = () => {
	return (
		<section className='flex flex-col gap-2'>
			<Button className='flex self-end' variant={"outline"} size='icon'>
				<IoFilter />
			</Button>
			<Suspense fallback={<ProductsSkeleton />}>
				<ProductsLoader />
			</Suspense>
		</section>
	);
};

export default ProductsDisplay;
