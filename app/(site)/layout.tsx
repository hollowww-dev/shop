import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/header";
import Footer from "@/components/footer";
import config from "@/lib/config.preval";
import { client } from "@/sanity/lib/client";
import { ProductType } from "@/types";
import { groq } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Providers>
					<Header />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}

export async function generateMetadata(): Promise<Metadata> {
	const product: { image: ProductType["image"] } = await client.fetch(
		groq`*[_type == "product"][0]{image}`,
		{},
		{
			cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
		}
	);

	return {
		title: `${config.title}`,
		description: `${config.description}`,
		openGraph: {
			images: [urlFor(product.image).width(1200).height(630).url()],
			url: `${config.siteUrl}`,
			type: "website",
		},
	};
}
