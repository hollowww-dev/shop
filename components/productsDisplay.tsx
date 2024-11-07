import { ProductType } from "@/types";
import Product, { ProductSkeleton } from "./product";

export const ProductDisplaySkeleton = () => {
	return (
		<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-3'>
			{Array.from({ length: 3 }).map((_, i) => (
				<ProductSkeleton key={i} />
			))}
		</div>
	);
};

const ProductDisplay = ({ products }: { products: ProductType[] }) => {
	return (
		<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-3'>
			{products.map((product) => (
				<Product key={product._id} product={product} />
			))}
		</div>
	);
};

export default ProductDisplay;
