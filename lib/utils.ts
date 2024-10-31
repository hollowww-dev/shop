import { urlFor } from "@/sanity/lib/image";
import { ProductType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartEntry, Product } from "use-shopping-cart/core";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function parseCartItem(product: ProductType): Product {
	return {
		id: product._id,
		name: product.name,
		image: urlFor(product.image).width(400).height(400).url(),
		currency: "EUR",
		price: product.price,
	};
}
