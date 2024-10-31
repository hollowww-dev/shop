import { client } from "@/sanity/lib/client";
import { PRODUCT } from "@/sanity/lib/queries";
import { ProductType } from "@/types";
import { ImageResponse } from "next/og";
import ImageComponent from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default async function Image({ params }: { params: { id: string } }) {
	const { id } = params;
	const product: ProductType = await client.fetch(
		PRODUCT,
		{ id },
		{
			cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
		}
	);

	return new ImageResponse(
		(
			<ImageComponent
				src={urlFor(product.image).width(1200).height(630).url()}
				alt={product.name}
				width={1200}
				height={630}
			/>
		),
		{
			width: 1200,
			height: 630,
		}
	);
}
