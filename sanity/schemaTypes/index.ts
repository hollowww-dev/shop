import { type SchemaTypeDefinition } from 'sanity'
import Product from './product'
import Settings from './settings'
import SocialMedia from './socialMedia'
import FAQ from './FAQ'
import aboutMe from './aboutMe'
import Shippings from './shippings'
import PortfolioAlbum from './portfolio'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [Product, PortfolioAlbum, Settings, Shippings, SocialMedia, aboutMe, FAQ],
}
