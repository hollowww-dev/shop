import PortfolioDetails from "@/components/portfolio/portfolioDetails";
import { PortfolioDetailsSkeleton } from "@/components/skeletons";
import configPreval from "@/lib/config.preval";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PORTFOLIO } from "@/sanity/lib/queries";
import { PortfolioType } from "@/types";
import type { Metadata } from "next";
import { Suspense } from "react";

export default async function Page(props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;

	return (
		<Suspense fallback={<PortfolioDetailsSkeleton />}>
			<PortfolioDetails id={id} />
		</Suspense>
	);
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
	const { id } = await props.params;

	const album: PortfolioType = await client.fetch(
		PORTFOLIO,
		{ id },
		{
			cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
		}
	);

	if (!album) {
		throw new Error("That product doesn't exist!");
	}

	return {
		title: `${album.title} | ${configPreval.title}`,
		openGraph: {
			images: [urlFor(album.cover).width(1200).height(630).url()],
			title: `${album.title} | ${configPreval.title}`,
			description: album.description,
			url: `${configPreval.siteUrl}/portfolio/${album._id}`,
			type: "website",
		},
	};
}
