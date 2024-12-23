import { groq } from 'next-sanity'

export const SETTINGS = groq`*[_type == "settings"][0]{
    title,
    currency,
    shipping{
        shippings[]{
            name,
            time,
            'price': price * 100
        },
        shippingCountries[]
    },
    description,
    landingImage
}`

export const FOOTER = groq`*[_type == "footer"][0]{
    socialMedia,
    footerPages
}`

export const FAQ = groq`*[_type == "faq"][0]{
    entries[] {
        answer,
        question
    }
}`

export const ABOUTME = groq`*[_type == "aboutMe"][0]{
    headline,
    description,
    avatar,
    information,
    contact
}`

export const PORTFOLIOS = groq`*[_type == "portfolioAlbum"]{
    _id,
    title,
    description,
    'count': count(products),
    cover
}
`

export const PORTFOLIO = groq`*[_type == "portfolioAlbum" && _id == $id][0]{
    title,
    description,
    'count': count(products),
    cover,
    products[]->{_id, name, description, image, gallery, stock, }
}`

export const PRODUCT = groq`
*[_type == "product" && _id == $id][0]{
    _id,
    stock,
    name,
    description,
    category,
    details,
    image,
    gallery,
    'price': price * 100,
    "featured": select(
        defined(featured) => featured[]->{
            _id,
            name,
            image,
            'price': price * 100,
            stock
        },
        count(*[_type == "product" && _id != ^._id && stock > 0]) > 0 => *[_type == "product" && _id != ^._id && stock > 0][0..3]{
            _id,
            name,
            image,
            'price': price * 100,
            stock
        },
        null
    )
}`
