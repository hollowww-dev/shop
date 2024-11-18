import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { client } from "@/sanity/lib/client";

export async function POST(req: NextRequest) {
    try {
        const event = await req.json();
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                const { data: lineItems } = await stripe.checkout.sessions.listLineItems(session.id)
                lineItems.forEach(async (item) => await client.patch(item.id).dec({ stock: 1 }).commit({ visibility: 'async' }))
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        return NextResponse.json({
            status: 200,
            received: true,
        });
    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        } else {
            return new Response("Something went wrong.", { status: 500 });
        }
    }
}

