import { Suspense } from 'react'

import PortfolioDisplay from '@/components/sections/portfolio/portfolioDisplay'
import { PortfoliosSkeleton } from '@/components/layout/skeletons'

export default async function Page() {
    return (
        <Suspense fallback={<PortfoliosSkeleton />}>
            <PortfolioDisplay />
        </Suspense>
    )
}
