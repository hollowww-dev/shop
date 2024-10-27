import { Settings } from "../sanity.types";
import { client } from "../sanity/lib/client";
import { SETTINGS } from "../sanity/lib/queries";
import preval from "next-plugin-preval";

if (!process.env.NEXT_PUBLIC_SITE_URL) {
	throw new Error("SITE_URL VARIABLE NOT PROVIDED.");
}

async function getConfig() {
	const { title, currency, description }: Settings = await client.fetch(
		SETTINGS,
		{},
		{ cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache" }
	);
	return {
		title,
		currency,
		description,
		siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "#",
	};
}
export default preval(getConfig());
