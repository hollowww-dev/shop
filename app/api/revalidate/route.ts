import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

if (!process.env.NEXT_PUBLIC_SANITY_REVALIDATE_SECRET) {
	throw new Error("SANITY_REVALIDATE_SECRET variable not provided.");
}

const secret = process.env.NEXT_PUBLIC_SANITY_REVALIDATE_SECRET;

export async function POST(req: NextRequest) {
	try {
		const { isValidSignature } = await parseBody(req, secret);
		if (!isValidSignature) {
			return new Response("Invalid Signature", { status: 401 });
		}
		revalidatePath("/");
		return NextResponse.json({
			status: 200,
			revalidated: true,
			now: Date.now(),
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
