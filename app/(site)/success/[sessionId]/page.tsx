import { Suspense } from 'react'

import ReturnMessage from '@/components/sections/success/returnMessage'

export default async function Page({ params }: { params: Promise<{ sessionId: string }> }) {
    const { sessionId } = await params
    return (
        <section className="flex flex-col items-center">
            <Suspense
                fallback={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-spin self-center"
                    >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                }
            >
                <ReturnMessage sessionId={sessionId} />
            </Suspense>
        </section>
    )
}
