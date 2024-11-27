import { clsx, type ClassValue } from "clsx";
import { Product } from "use-shopping-cart/core";
import { twMerge } from "tailwind-merge";

import configPreval from "./config.preval";
import { urlFor } from "@/sanity/lib/image";

import { ProductType } from "@/types";

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
