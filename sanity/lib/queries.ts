import { groq } from "next-sanity";

export const SETTINGS = groq`*[_type == "settings"][0]{
title,
currency,
description
}`;

export const SHIPPINGS = groq`*[_type == "shipping"][0]{
shippings[] {
name,
time,
'price': price * 100
},
worldwideShipping
}
`;

export const SOCIALMEDIA = groq`*[_type == "socialMedia"][0]{
instagram,
facebook,
pinterest,
tiktok,
youtube
}`;

export const FAQ = groq`*[_type == "faq"][0]{
entries[] {
    answer,
    question
}
}`;

export const ABOUTME = groq`*[_type == "aboutMe"][0]{
headline,
description,
avatar,
information,
contact
}`;

export const PORTFOLIOS = groq`*[_type == "portfolioAlbum"]{
    _id,
    title,
    description,
    'count': count(products),
    cover
}
`;

export const PORTFOLIO = groq`*[_type == "portfolioAlbum" && _id == $id][0]{
    title,
    description,
    cover,
    products[]->{name, description, image, gallery}
}`;

export const PRODUCT = groq`*[_type == "product" && _id == $id][0]{
    _id,
    name,
    description,
    category,
    details,
    image,
    gallery,
    'price': price * 100,
    defined(featured) => {
        featured[]->{
        _id,
        name,
        image,
        'price': price * 100,
        available
        }
    },
    !defined(featured) => {
        'featured': *[_type == "product" && _id != ^._id && stock > 0][0..3]{
        _id,
        name,
        image,
        'price': price * 100,
        available
        }
    }
}`;
