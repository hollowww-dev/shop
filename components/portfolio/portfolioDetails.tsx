"use client";

import { client } from "@/sanity/lib/client";
import { PORTFOLIO } from "@/sanity/lib/queries";
import { PortfolioType } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";

const PortfolioDetails = ({ id }: { id: string }) => {
	const { data: portfolio } = useSuspenseQuery({
		queryKey: ["portfolio", id],
		queryFn: () =>
			client.fetch<PortfolioType>(
				PORTFOLIO,
				{ id },
				{ cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache" }
			),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});
	console.log(portfolio);
	return <></>;
};

export default PortfolioDetails;
