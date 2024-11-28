'use client'

import { useSuspenseInfiniteQuery, useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { startTransition, useEffect, useRef, useState } from 'react'

import { groq } from 'next-sanity'

import { Button } from '@/components/shadcn/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/popover'
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/shadcn/select'
import Product from './product'

import { client } from '@/sanity/lib/client'

import { ProductType } from '@/types'

import { VscSettings, VscListFilter } from 'react-icons/vsc'

const Products = ({
    orderBy,
    order,
    category,
    filters,
}: {
    orderBy: 'price'
    order: 'ascending' | 'descending'
    category: string
    filters: Map<string, string>
}) => {
    const observerRef = useRef<HTMLDivElement | null>(null)

    const fetchProducts = async ({ pageParam = 0 }: { pageParam?: number }) => {
        const pageSize = 10
        const products = await client.fetch<ProductType[]>(
            groq`*[_type == "product" && stock > 0${category !== 'all' ? ` && category == "${category}"` : ''}${Array.from([...filters])
                .map((filter) => ` && "${filter[1]}" in details[detail == "${filter[0]}"].answer`)
                .join('')}][${pageParam}...${pageParam + pageSize}]{
                    _id,
    				name,
    				image,
    				category,
    				'price': price * 100,
                }`,
            {},
            {
                cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'force-cache',
            }
        )
        return {
            products,
            nextPage: products.length === pageSize ? pageParam + pageSize : null,
        }
    }

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useSuspenseInfiniteQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    })

    const allProducts = data?.pages.flatMap((page) => page.products) || []

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage()
                }
            },
            { threshold: 1.0 }
        )
        const observerCurrent = observerRef.current
        if (observerCurrent) observer.observe(observerCurrent)
        return () => {
            if (observerCurrent) observer.unobserve(observerCurrent)
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])

    useEffect(() => {
        startTransition(() => {
            refetch()
        })
    }, [category, filters, refetch])

    const orderProducts = (products: ProductType[]) => {
        switch (orderBy) {
            case 'price':
                return products.sort((a, b) => (order === 'ascending' ? a.price - b.price : b.price - a.price))
            default:
                return products
        }
    }

    const orderedProducts = orderProducts(allProducts)

    return (
        <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-3">
                {orderedProducts.map((product) => (
                    <Product key={product._id} product={product} />
                ))}
                <div ref={observerRef} className="w-full h-4"></div>
            </div>
            {isFetchingNextPage && (
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
                    className="animate-spin self-center mt-32"
                >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
            )}
        </>
    )
}

const ProductsDisplay = () => {
    const [orderBy, setOrderBy] = useState<'price'>('price')
    const [order, setOrder] = useState<'ascending' | 'descending'>('descending')
    const [categoryFilter, setCategoryFilter] = useState<string>('all')
    const [activeFilters, setActiveFilters] = useState<Map<string, string>>(new Map())
    const { data: categories } = useSuspenseQuery({
        queryKey: ['categories'],
        queryFn: () =>
            client.fetch(
                groq`array::unique(*[_type == "product" && stock > 0].category)`,
                {},
                {
                    cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'force-cache',
                }
            ),
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    })
    const { data: filters, isLoading: filtersFetching } = useQuery({
        queryKey: ['filters', categoryFilter],
        queryFn: () =>
            client
                .fetch(
                    groq`*[_type == "product"${categoryFilter !== 'all' ? ` && category == "${categoryFilter}"` : ''}].details[]{
    						"detail": detail,
							"answers": array::unique(*[_type == "product"${categoryFilter !== 'all' ? ` && category == "${categoryFilter}"` : ''}].details[detail == ^.detail].answer)
  						}`,
                    {},
                    {
                        cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'force-cache',
                    }
                )
                .then((results: { detail: string; answers: string[] }[]) =>
                    Array.from(new Set(results.map((d) => d.detail))).map((detail) => ({
                        detail,
                        answers: Array.from(new Set(results.filter((d) => d.detail === detail).flatMap((d) => d.answers))),
                    }))
                ),
        enabled: categoryFilter !== 'all',
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    })

    return (
        <section className="flex flex-col gap-2">
            <div className="flex gap-2 self-end">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={'outline'} size="icon">
                            <VscSettings />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="flex flex-col gap-3">
                        <Select
                            value={categoryFilter}
                            onValueChange={(value: string) => {
                                setCategoryFilter(value)
                                setActiveFilters(new Map())
                            }}
                            disabled={filtersFetching}
                        >
                            <SelectTrigger className="w-full gap-2">
                                <span className="muted">Category:</span>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={'all'}>All</SelectItem>
                                {categories.map((category: string, i: number) => (
                                    <SelectItem value={category} key={i}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {!filters ? (
                            <p className="muted text-center py-2">Pick a category to see more filters</p>
                        ) : (
                            filters.map((filter) => (
                                <Select
                                    key={filter.detail}
                                    value={activeFilters.get(filter.detail) || 'all'}
                                    onValueChange={(value: string) =>
                                        value !== 'all'
                                            ? setActiveFilters((prev) => new Map([...prev, [filter.detail, value]]))
                                            : setActiveFilters((prev) => new Map([...prev].filter(([k, _v]) => k !== filter.detail)))
                                    }
                                >
                                    <SelectTrigger className="w-full gap-2">
                                        <span className="muted">{filter.detail}:</span>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={'all'}>All</SelectItem>
                                        {filter.answers.map((answer, i) => (
                                            <SelectItem value={answer} key={i}>
                                                {answer}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ))
                        )}
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={'outline'} size="icon">
                            <VscListFilter />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="flex flex-col gap-3">
                        <Select value={orderBy} onValueChange={(value: 'price') => setOrderBy(value)}>
                            <SelectTrigger className="w-full gap-2">
                                <span className="muted">Sort by:</span>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="price">Price</SelectItem>
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
            <Products order={order} orderBy={orderBy} category={categoryFilter} filters={activeFilters} />
        </section>
    )
}

export default ProductsDisplay
