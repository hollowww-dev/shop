import { Shipping } from "../sanity.types";
import { client } from "../sanity/lib/client";
import preval from "next-plugin-preval";
import { SHIPPINGS } from "../sanity/lib/queries";

async function getShippings() {
	const shippings: Shipping = await client.fetch(
		SHIPPINGS,
		{},
		{ cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache" }
	);
	return shippings;
}
export default preval(getShippings());
