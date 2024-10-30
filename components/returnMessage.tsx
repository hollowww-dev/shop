import stripe from "@/lib/stripe";
import Link from "next/link";
import CompleteMessage from "./completeMessage";

export default async function ReturnMessage({ sessionId }: { sessionId: string }) {
	try {
		const { status, payment_status, url } = await stripe.checkout.sessions.retrieve(sessionId);
		switch (status) {
			case "complete":
				return <CompleteMessage payment_status={payment_status} />;
			case "open":
				return (
					<>
						<p>Your session is still open.</p>
						{url && <Link href={url}>Return to payment.</Link>}
					</>
				);
			case "expired":
				return <p>Your session has expired.</p>;
		}
	} catch (error) {
		console.error(error);
		return <p>Something went wrong. Try again, please.</p>;
	}
}
