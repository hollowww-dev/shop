import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { client } from "@/sanity/lib/client";

export async function POST(req: NextRequest) {
	try {
		const event = await req.json();
		switch (event.type) {
			case "checkout.session.completed":
				const session = event.data.object;
				const { sanityIds } = session.metadata;
				const parsedIds = JSON.parse(sanityIds);
				parsedIds.forEach(
					async (item: { id: string; quantity: number }) =>
						await client.patch(item.id).dec({ stock: item.quantity }).commit()
				);
				revalidatePath("/");
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
