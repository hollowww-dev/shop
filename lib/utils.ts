import { PRODUCTSResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Product } from "use-shopping-cart/core";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseCartItem(product: PRODUCTSResult[number]): Product {
	return {
		id: product.id,
		name: product.title,
		image: urlFor(product.image).width(400).height(400).url(),
		currency: 'EUR',
		price: product.price,
	};
}