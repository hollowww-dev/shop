import Stripe from "stripe";

if (!process.env.NEXT_PUBLIC_STRIPE_TEST_SECRET) {
	throw new Error("NEXT_PUBLIC_STRIPE_TEST_SECRET is missing. Please set the environment variable.");
}

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_TEST_SECRET, {
	apiVersion: "2024-09-30.acacia",
});

export default stripe;