import { urlFor } from "@/sanity/lib/image";
import { ProductType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product } from "use-shopping-cart/core";
import configPreval from "./config.preval";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function parseCartItem(product: ProductType): Product {
	return {
		id: product._id,
		image: urlFor(product.image).width(400).height(400).url(),
		name: product.name,
		price: product.price,
		currency: configPreval.currency,
	};
}