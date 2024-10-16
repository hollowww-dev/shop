import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

if(!process.env.SANITY_REVALIDATE_SECRET) {
    throw new Error('SANITY_REVALIDATE_SECRET variable not provided.')
}

const secret = process.env.SANITY_REVALIDATE_SECRET


export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
    }>(req, secret);

    if (!isValidSignature) {
      return new Response("Invalid Signature", { status: 401 });
    }

    if (!body?._type) {
      return new Response("Bad Request", { status: 400 });
    }
    revalidatePath('/')
    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (error: unknown) {
    console.error(error);
    if(error instanceof Error){
        return new Response(error.message, { status: 500 }); 
    } else {
        return new Response('Something went wrong.', { status: 500 })
    }
  }
}