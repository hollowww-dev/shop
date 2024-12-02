/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
    _type: 'sanity.imagePaletteSwatch'
    background?: string
    foreground?: string
    population?: number
    title?: string
}

export type SanityImagePalette = {
    _type: 'sanity.imagePalette'
    darkMuted?: SanityImagePaletteSwatch
    lightVibrant?: SanityImagePaletteSwatch
    darkVibrant?: SanityImagePaletteSwatch
    vibrant?: SanityImagePaletteSwatch
    dominant?: SanityImagePaletteSwatch
    lightMuted?: SanityImagePaletteSwatch
    muted?: SanityImagePaletteSwatch
}

export type SanityImageDimensions = {
    _type: 'sanity.imageDimensions'
    height?: number
    width?: number
    aspectRatio?: number
}

export type SanityFileAsset = {
    _id: string
    _type: 'sanity.fileAsset'
    _createdAt: string
    _updatedAt: string
    _rev: string
    originalFilename?: string
    label?: string
    title?: string
    description?: string
    altText?: string
    sha1hash?: string
    extension?: string
    mimeType?: string
    size?: number
    assetId?: string
    uploadId?: string
    path?: string
    url?: string
    source?: SanityAssetSourceData
}

export type Geopoint = {
    _type: 'geopoint'
    lat?: number
    lng?: number
    alt?: number
}

export type Faq = {
    _id: string
    _type: 'faq'
    _createdAt: string
    _updatedAt: string
    _rev: string
    entries?: Array<{
        question: string
        answer: string
        _type: 'entry'
        _key: string
    }>
}

export type AboutMe = {
    _id: string
    _type: 'aboutMe'
    _createdAt: string
    _updatedAt: string
    _rev: string
    headline: string
    description: string
    avatar: {
        asset?: {
            _ref: string
            _type: 'reference'
            _weak?: boolean
            [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
        }
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        _type: 'image'
    }
    information?: Array<{
        key: string
        value: Array<string>
        _type: 'entry'
        _key: string
    }>
    contact?: Array<{
        key: string
        value: string
        hidden: boolean
        _type: 'entry'
        _key: string
    }>
}

export type Footer = {
    _id: string
    _type: 'footer'
    _createdAt: string
    _updatedAt: string
    _rev: string
    footerPages?: Array<{
        title: string
        slug: Slug
        content: Array<{
            children?: Array<{
                marks?: Array<string>
                text?: string
                _type: 'span'
                _key: string
            }>
            style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
            listItem?: 'bullet' | 'number'
            markDefs?: Array<{
                href?: string
                _type: 'link'
                _key: string
            }>
            level?: number
            _type: 'block'
            _key: string
        }>
        _type: 'page'
        _key: string
    }>
    socialMedia: {
        instagram?: string
        facebook?: string
        pinterest?: string
        tiktok?: string
        youtube?: string
    }
}

export type Slug = {
    _type: 'slug'
    current: string
    source?: string
}

export type Shipping = {
    _id: string
    _type: 'shipping'
    _createdAt: string
    _updatedAt: string
    _rev: string
    shippings: Array<{
        name: string
        time: number
        price: number
        _type: 'entry'
        _key: string
    }>
    worldwideShipping?: boolean
}

export type Settings = {
    _id: string
    _type: 'settings'
    _createdAt: string
    _updatedAt: string
    _rev: string
    title: string
    description: string
    currency: string
    landingImage: {
        image: {
            asset?: {
                _ref: string
                _type: 'reference'
                _weak?: boolean
                [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
            }
            hotspot?: SanityImageHotspot
            crop?: SanityImageCrop
            _type: 'image'
        }
        overlay: number
    }
}

export type PortfolioAlbum = {
    _id: string
    _type: 'portfolioAlbum'
    _createdAt: string
    _updatedAt: string
    _rev: string
    title: string
    description: string
    cover: {
        asset?: {
            _ref: string
            _type: 'reference'
            _weak?: boolean
            [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
        }
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        _type: 'image'
    }
    products?: Array<{
        _ref: string
        _type: 'reference'
        _weak?: boolean
        _key: string
        [internalGroqTypeReferenceTo]?: 'product'
    }>
}

export type Product = {
    _id: string
    _type: 'product'
    _createdAt: string
    _updatedAt: string
    _rev: string
    name: string
    description: string
    category: string
    details?: Array<{
        detail: string
        answer: string
        _key: string
    }>
    price: number
    image: {
        asset?: {
            _ref: string
            _type: 'reference'
            _weak?: boolean
            [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
        }
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        _type: 'image'
    }
    gallery?: Array<{
        asset?: {
            _ref: string
            _type: 'reference'
            _weak?: boolean
            [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
        }
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        _type: 'image'
        _key: string
    }>
    stock: number
    featured?: Array<{
        _ref: string
        _type: 'reference'
        _weak?: boolean
        _key: string
        [internalGroqTypeReferenceTo]?: 'product'
    }>
}

export type SanityImageCrop = {
    _type: 'sanity.imageCrop'
    top?: number
    bottom?: number
    left?: number
    right?: number
}

export type SanityImageHotspot = {
    _type: 'sanity.imageHotspot'
    x?: number
    y?: number
    height?: number
    width?: number
}

export type SanityImageAsset = {
    _id: string
    _type: 'sanity.imageAsset'
    _createdAt: string
    _updatedAt: string
    _rev: string
    originalFilename?: string
    label?: string
    title?: string
    description?: string
    altText?: string
    sha1hash?: string
    extension?: string
    mimeType?: string
    size?: number
    assetId?: string
    uploadId?: string
    path?: string
    url?: string
    metadata?: SanityImageMetadata
    source?: SanityAssetSourceData
}

export type SanityAssetSourceData = {
    _type: 'sanity.assetSourceData'
    name?: string
    id?: string
    url?: string
}

export type SanityImageMetadata = {
    _type: 'sanity.imageMetadata'
    location?: Geopoint
    dimensions?: SanityImageDimensions
    palette?: SanityImagePalette
    lqip?: string
    blurHash?: string
    hasAlpha?: boolean
    isOpaque?: boolean
}

export type AllSanitySchemaTypes =
    | SanityImagePaletteSwatch
    | SanityImagePalette
    | SanityImageDimensions
    | SanityFileAsset
    | Geopoint
    | Faq
    | AboutMe
    | Footer
    | Slug
    | Shipping
    | Settings
    | PortfolioAlbum
    | Product
    | SanityImageCrop
    | SanityImageHotspot
    | SanityImageAsset
    | SanityAssetSourceData
    | SanityImageMetadata
export declare const internalGroqTypeReferenceTo: unique symbol
// Source: ./sanity/lib/queries.ts
// Variable: SETTINGS
// Query: *[_type == "settings"][0]{    title,    currency,    description,    landingImage}
export type SETTINGSResult = {
    title: string
    currency: string
    description: string
    landingImage: {
        image: {
            asset?: {
                _ref: string
                _type: 'reference'
                _weak?: boolean
                [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
            }
            hotspot?: SanityImageHotspot
            crop?: SanityImageCrop
            _type: 'image'
        }
        overlay: number
    }
} | null
// Variable: SHIPPINGS
// Query: *[_type == "shipping"][0]{    shippings[] {        name,        time,        'price': price * 100    },    worldwideShipping}
export type SHIPPINGSResult = {
    shippings: Array<{
        name: string
        time: number
        price: number
    }>
    worldwideShipping: boolean | null
} | null
// Variable: FOOTER
// Query: *[_type == "footer"][0]{    socialMedia,    footerPages}
export type FOOTERResult = {
    socialMedia: {
        instagram?: string
        facebook?: string
        pinterest?: string
        tiktok?: string
        youtube?: string
    }
    footerPages: Array<{
        title: string
        slug: Slug
        content: Array<{
            children?: Array<{
                marks?: Array<string>
                text?: string
                _type: 'span'
                _key: string
            }>
            style?: 'blockquote' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'normal'
            listItem?: 'bullet' | 'number'
            markDefs?: Array<{
                href?: string
                _type: 'link'
                _key: string
            }>
            level?: number
            _type: 'block'
            _key: string
        }>
        _type: 'page'
        _key: string
    }> | null
} | null
// Variable: FAQ
// Query: *[_type == "faq"][0]{    entries[] {        answer,        question    }}
export type FAQResult = {
    entries: Array<{
        answer: string
        question: string
    }> | null
} | null
// Variable: ABOUTME
// Query: *[_type == "aboutMe"][0]{    headline,    description,    avatar,    information,    contact}
export type ABOUTMEResult = {
    headline: string
    description: string
    avatar: {
        asset?: {
            _ref: string
            _type: 'reference'
            _weak?: boolean
            [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
        }
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        _type: 'image'
    }
    information: Array<{
        key: string
        value: Array<string>
        _type: 'entry'
        _key: string
    }> | null
    contact: Array<{
        key: string
        value: string
        hidden: boolean
        _type: 'entry'
        _key: string
    }> | null
} | null
// Variable: PORTFOLIOS
// Query: *[_type == "portfolioAlbum"]{    _id,    title,    description,    'count': count(products),    cover}
export type PORTFOLIOSResult = Array<{
    _id: string
    title: string
    description: string
    count: number | null
    cover: {
        asset?: {
            _ref: string
            _type: 'reference'
            _weak?: boolean
            [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
        }
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        _type: 'image'
    }
}>
// Variable: PORTFOLIO
// Query: *[_type == "portfolioAlbum" && _id == $id][0]{    title,    description,    'count': count(products),    cover,    products[]->{_id, name, description, image, gallery, stock, }}
export type PORTFOLIOResult = {
    title: string
    description: string
    count: number | null
    cover: {
        asset?: {
            _ref: string
            _type: 'reference'
            _weak?: boolean
            [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
        }
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        _type: 'image'
    }
    products: Array<{
        _id: string
        name: string
        description: string
        image: {
            asset?: {
                _ref: string
                _type: 'reference'
                _weak?: boolean
                [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
            }
            hotspot?: SanityImageHotspot
            crop?: SanityImageCrop
            _type: 'image'
        }
        gallery: Array<{
            asset?: {
                _ref: string
                _type: 'reference'
                _weak?: boolean
                [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
            }
            hotspot?: SanityImageHotspot
            crop?: SanityImageCrop
            _type: 'image'
            _key: string
        }> | null
        stock: number
    }> | null
} | null
// Variable: PRODUCT
// Query: *[_type == "product" && _id == $id][0]{    _id,    name,    description,    category,    details,    image,    gallery,    'price': price * 100,    "featured": select(        defined(featured) => featured[]->{            _id,            name,            image,            'price': price * 100,            stock        },        count(*[_type == "product" && _id != ^._id && stock > 0]) > 0 => *[_type == "product" && _id != ^._id && stock > 0][0..3]{            _id,            name,            image,            'price': price * 100,            stock        },        null    )}
export type PRODUCTResult = {
    _id: string
    name: string
    description: string
    category: string
    details: Array<{
        detail: string
        answer: string
        _key: string
    }> | null
    image: {
        asset?: {
            _ref: string
            _type: 'reference'
            _weak?: boolean
            [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
        }
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        _type: 'image'
    }
    gallery: Array<{
        asset?: {
            _ref: string
            _type: 'reference'
            _weak?: boolean
            [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
        }
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        _type: 'image'
        _key: string
    }> | null
    price: number
    featured: Array<{
        _id: string
        name: string
        image: {
            asset?: {
                _ref: string
                _type: 'reference'
                _weak?: boolean
                [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
            }
            hotspot?: SanityImageHotspot
            crop?: SanityImageCrop
            _type: 'image'
        }
        price: number
        stock: number
    }> | null
} | null

// Query TypeMap
import '@sanity/client'
declare module '@sanity/client' {
    interface SanityQueries {
        '*[_type == "settings"][0]{\n    title,\n    currency,\n    description,\n    landingImage\n}': SETTINGSResult
        '*[_type == "shipping"][0]{\n    shippings[] {\n        name,\n        time,\n        \'price\': price * 100\n    },\n    worldwideShipping\n}\n': SHIPPINGSResult
        '*[_type == "footer"][0]{\n    socialMedia,\n    footerPages\n}': FOOTERResult
        '*[_type == "faq"][0]{\n    entries[] {\n        answer,\n        question\n    }\n}': FAQResult
        '*[_type == "aboutMe"][0]{\n    headline,\n    description,\n    avatar,\n    information,\n    contact\n}': ABOUTMEResult
        '*[_type == "portfolioAlbum"]{\n    _id,\n    title,\n    description,\n    \'count\': count(products),\n    cover\n}\n': PORTFOLIOSResult
        '*[_type == "portfolioAlbum" && _id == $id][0]{\n    title,\n    description,\n    \'count\': count(products),\n    cover,\n    products[]->{_id, name, description, image, gallery, stock, }\n}': PORTFOLIOResult
        '\n*[_type == "product" && _id == $id][0]{\n    _id,\n    name,\n    description,\n    category,\n    details,\n    image,\n    gallery,\n    \'price\': price * 100,\n    "featured": select(\n        defined(featured) => featured[]->{\n            _id,\n            name,\n            image,\n            \'price\': price * 100,\n            stock\n        },\n        count(*[_type == "product" && _id != ^._id && stock > 0]) > 0 => *[_type == "product" && _id != ^._id && stock > 0][0..3]{\n            _id,\n            name,\n            image,\n            \'price\': price * 100,\n            stock\n        },\n        null\n    )\n}': PRODUCTResult
    }
}
