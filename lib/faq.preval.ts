import { Faq as FAQType } from "@/sanity.types";
import { client } from "../sanity/lib/client";
import { FAQ as FAQQuery } from "../sanity/lib/queries";
import preval from "next-plugin-preval";

async function getFAQ() {
	const { entries }: FAQType = await client.fetch(
		FAQQuery,
		{},
		{ cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache" }
	);
	return entries;
}
export default preval(getFAQ());
