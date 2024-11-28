'use client'

import { useEffect } from 'react'
import Link from 'next/link'

import { Button } from '@/components/shadcn/button'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col gap-2 items-center">
            <div className="flex flex-col items-center gap-3 lg:gap-6 text-center">
                <h2>Something went wrong</h2>
                <p>{error.message}</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-2">
                <Button onClick={() => reset()}>Try again</Button>
                <Button asChild>
                    <Link href="/" className="no-underline">
                        Go back to home page
                    </Link>
                </Button>
            </div>
        </div>
    )
}
