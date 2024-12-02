import { type SchemaTypeDefinition } from 'sanity'
import Product from './product'
import Settings from './settings'
import FAQ from './FAQ'
import aboutMe from './aboutMe'
import Shippings from './shippings'
import PortfolioAlbum from './portfolio'
import Footer from './footer'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [Product, PortfolioAlbum, Settings, Shippings, Footer, aboutMe, FAQ] as SchemaTypeDefinition[],
}
