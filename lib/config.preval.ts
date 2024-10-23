import { SETTINGSResult } from "../sanity.types";
import { client } from "../sanity/lib/client";
import { SETTINGS } from "../sanity/lib/queries";
import preval from "next-plugin-preval";

if (!process.env.NEXT_PUBLIC_SITE_URL) {
	throw new Error("SITE_URL VARIABLE NOT PROVIDED.");
}

async function getConfig() {
	const data = await client.fetch<Promise<SETTINGSResult>>(
		SETTINGS,
		{},
		{ cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache" }
	);
	return {
		title: data?.title ? data.title : "Untitled",
		currency: data?.currency ? data.currency : "EUR",
		siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
	};
}
export default preval(getConfig());
