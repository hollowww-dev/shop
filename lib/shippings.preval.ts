import preval from "next-plugin-preval";

import { client } from "../sanity/lib/client";
import { SHIPPINGS } from "../sanity/lib/queries";

import { Shipping } from "../sanity.types";

async function getShippings() {
	const shippings: Shipping = await client.fetch(
		SHIPPINGS,
		{},
		{ cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache" }
	);
	return shippings;
}
export default preval(getShippings());
