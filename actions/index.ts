"use server";

import stripe from "@/lib/stripe";
import { type CartDetails } from "use-shopping-cart/core";
import { validateCartItems } from "use-shopping-cart/utilities";
import { client } from "@/sanity/lib/client";
import { PRODUCTS } from "@/sanity/lib/queries";
import { Product } from "@/sanity.types";
import { parseCartItem } from "@/lib/utils";

export async function createCheckoutSession(cartDetails: CartDetails): Promise<{ sessionId: string }> {
	if (!process.env.NEXT_PUBLIC_SITE_URL) {
		throw new Error("NEXT_PUBLIC_SITE_URL is not defined.");
	}
	try {
		const products: Product[] = await client.fetch(PRODUCTS);
		const line_items = validateCartItems(
			products.map((item) => parseCartItem(item)),
			cartDetails
		);
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "payment",
			success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success/{CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
			line_items,
		});
		return { sessionId: session.id };
	} catch (error) {
		console.error(error);
		if (error instanceof Error) {
			throw new Error(`Failed to create checkout session: ${error.message}`);
		} else {
			throw new Error("An unknown error occurred while creating the checkout session");
		}
	}
}
