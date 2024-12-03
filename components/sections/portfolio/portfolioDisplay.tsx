'use client'

import { useState } from 'react'

import { useSuspenseQuery } from '@tanstack/react-query'

import Portfolio from './portfolio'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/popover'
import { Button } from '@/components/shadcn/button'

import { client } from '@/sanity/lib/client'
import { PORTFOLIOS } from '@/sanity/lib/queries'

import { PortfolioType } from '@/types'
import { VscListFilter } from 'react-icons/vsc'

const PortfolioDisplay = () => {
    const [orderBy, setOrderBy] = useState<'count'>('count')
    const [order, setOrder] = useState<'ascending' | 'descending'>('descending')

    const { data: albums } = useSuspenseQuery({
        queryKey: ['albums'],
        queryFn: () =>
            client.fetch<PortfolioType[]>(
                PORTFOLIOS,
                {},
                {
                    cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'force-cache',
                }
            ),
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    })

    const orderAlbums = (albums: PortfolioType[]) => {
        switch (orderBy) {
            case 'count':
                switch (order) {
                    case 'ascending':
                        return albums.sort((a, b) => a.count - b.count)
                    case 'descending':
                        return albums.sort((a, b) => b.count - a.count)
                }
        }
    }

    const orderedAlbums = orderAlbums(albums || [])

    return (
        <section className="flex flex-col gap-2">
            <div className="flex gap-2 self-end">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={'outline'} size="icon">
                            <VscListFilter />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="flex flex-col gap-3">
                        <Select value={orderBy} onValueChange={(value: 'count') => setOrderBy(value)}>
                            <SelectTrigger className="w-full gap-2">
                                <span className="muted">Sort by:</span>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="count">Amount of items</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={order} onValueChange={(value: 'descending' | 'ascending') => setOrder(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="descending">Highest to lowest</SelectItem>
                                <SelectItem value="ascending">Lowest to highest</SelectItem>
                            </SelectContent>
                        </Select>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="grid md:grid-cols-2 gap-6 py-3">
                {orderedAlbums.map((album) => (
                    <Portfolio album={album} key={album._id} />
                ))}
            </div>
        </section>
    )
}

export default PortfolioDisplay
