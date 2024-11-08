"use client";

import { Toaster } from "@/components/ui/toaster";
import config from "@/lib/config.preval";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { CartProvider } from "use-shopping-cart";

export default function Providers({ children }: { children: ReactNode }) {
	if (!process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE) {
		throw new Error("NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE is missing. Please set the environment variable.");
	}
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<CartProvider
				cartMode='checkout-session'
				stripe={process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE}
				currency={config.currency}
				shouldPersist={true}
			>
				{children}
				<Toaster />
			</CartProvider>
		</QueryClientProvider>
	);
}
