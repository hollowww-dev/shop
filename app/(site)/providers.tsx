"use client";

import { ReactNode } from "react";

import { CartProvider } from "use-shopping-cart";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

import { Toaster } from "@/components/shadcn/toaster";

import { getQueryClient } from "@/lib/queryClient";
import config from "@/lib/config.preval";

export default function Providers({ children }: { children: ReactNode }) {
	if (!process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE) {
		throw new Error("NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE is missing. Please set the environment variable.");
	}

	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryStreamedHydration>
				<CartProvider
					cartMode='checkout-session'
					stripe={process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE}
					currency={config.currency}
					shouldPersist={true}
				>
					{children}
					<Toaster />
				</CartProvider>
			</ReactQueryStreamedHydration>
		</QueryClientProvider>
	);
}
