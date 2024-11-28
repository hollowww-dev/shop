import Link from 'next/link'

import stripe from '@/lib/stripe'

import CompleteMessage from './completeMessage'
import { Button } from '@/components/shadcn/button'

export default async function ReturnMessage({ sessionId }: { sessionId: string }) {
    try {
        const { status, payment_status, url } = await stripe.checkout.sessions.retrieve(sessionId)
        switch (status) {
            case 'complete':
                return <CompleteMessage payment_status={payment_status} />
            case 'open':
                return (
                    <>
                        <p>Your session is still open.</p>
                        {url && (
                            <Button asChild>
                                <Link href={url} className="no-underline">
                                    Return to payment.
                                </Link>
                            </Button>
                        )}
                    </>
                )
            case 'expired':
                return <p>Your session has expired.</p>
        }
    } catch (error) {
        return <p>Something went wrong. Try again, please.</p>
    }
}
