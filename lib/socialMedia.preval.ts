import preval from "next-plugin-preval";

import { SocialMedia } from "@/sanity.types";

import { client } from "../sanity/lib/client";
import { SOCIALMEDIA } from "../sanity/lib/queries";

async function getSocialMedia() {
	const socialMedia: SocialMedia = await client.fetch(
		SOCIALMEDIA,
		{},
		{ cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache" }
	);
	return socialMedia;
}
export default preval(getSocialMedia());
