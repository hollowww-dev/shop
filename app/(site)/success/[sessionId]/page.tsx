import { Suspense } from "react";

import ReturnMessage from "@/components/sections/success/returnMessage";

export default async function Page({ params }: { params: Promise<{ sessionId: string }> }) {
	const { sessionId } = await params;
	return (
		<main className='container mx-auto flex flex-col items-center'>
			<Suspense fallback={<p>Retrieving your session...</p>}>
				<ReturnMessage sessionId={sessionId} />
			</Suspense>
		</main>
	);
}
