"use server";

import stripe from "@/lib/stripe";
import { type CartDetails } from "use-shopping-cart/core";
import { validateCartItems } from "use-shopping-cart/utilities";
import { client } from "@/sanity/lib/client";
import { PRODUCTS } from "@/sanity/lib/queries";
import { parseCartItem } from "@/lib/utils";
import { ProductType } from "@/types";
import shippingsPreval from "@/lib/shippings.preval";
import configPreval from "@/lib/config.preval";
import { headers } from "next/headers";

export async function createCheckoutSession(cartDetails: CartDetails): Promise<{ sessionId: string }> {
	if (!process.env.NEXT_PUBLIC_SITE_URL) {
		throw new Error("NEXT_PUBLIC_SITE_URL is not defined.");
	}
	try {
		const products: ProductType[] = await client.fetch(PRODUCTS);
		const line_items = validateCartItems(
			products.map((item) => parseCartItem(item)),
			cartDetails
		);
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "payment",
			success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success/{CHECKOUT_SESSION_ID}`,
			cancel_url: `${(await headers()).get("referer")}`,
			line_items,
			shipping_options: shippingsPreval.shippings.map((shipping) => {
				return {
					shipping_rate_data: {
						display_name: shipping.name,
						delivery_estimate: {
							maximum: { unit: "business_day", value: shipping.time },
						},
						fixed_amount: { amount: shipping.price, currency: configPreval.currency },
						type: "fixed_amount",
					},
				};
			}),
			billing_address_collection: "required",
			shipping_address_collection: {
				allowed_countries:
					shippingsPreval.worldwideShipping ?
						[]
					:	[
							"AT",
							"BE",
							"BG",
							"HR",
							"CY",
							"CZ",
							"DK",
							"EE",
							"FI",
							"FR",
							"DE",
							"GR",
							"HU",
							"IE",
							"IT",
							"LV",
							"LT",
							"LU",
							"MT",
							"NL",
							"PL",
							"PT",
							"RO",
							"SK",
							"SI",
							"ES",
							"SE",
						],
			},
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
