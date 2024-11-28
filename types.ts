import { PortfolioAlbum, Product } from './sanity.types'

export type ProductType = Omit<Product, 'featured'> & { featured?: Product[] }
export type PortfolioType = Omit<PortfolioAlbum, 'products'> & {
    products?: Product[]
    count: number
}
