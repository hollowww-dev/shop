import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

if (!process.env.NEXT_PUBLIC_SANITY_REVALIDATE_SECRET) {
	throw new Error("SANITY_REVALIDATE_SECRET variable not provided.");
}

const secret = process.env.NEXT_PUBLIC_SANITY_REVALIDATE_SECRET;

export async function POST(req: NextRequest) {
	try {
		const { body, isValidSignature } = await parseBody(req, secret);
		if (!isValidSignature || !body) {
			return new Response("Invalid Signature", { status: 401 });
		}
		console.log(body);
		switch (body._type) {
			case "product":
				revalidatePath("/");
			case "settings":
				fetch("https://api.vercel.com/v1/integrations/deploy/prj_Lt4Np3lTqmyGijjGyWFn79dZcqrU/Mu0HfEpsvZ", {
					method: "POST",
				});
			default:
				break;
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
