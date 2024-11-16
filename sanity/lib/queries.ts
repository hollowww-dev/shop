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

export const PRODUCTS = groq`*[_type == "product"]{
    _id,
    name,
    image,
    category,
    'price': price * 100,
    available
}`;

export const PRODUCTS_CATEGORY = groq`
*[_type == "product" && category == $category]{
    _id,
    name,
    image,
    category,
    'price': price * 100,
    available
}
`;

export const PRODUCT = groq`*[_id == $id][0]{
    _id,
    name,
    description,
    category,
    details,
    image,
    gallery,
    'price': price * 100,
    available,
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
        'featured': *[_type == "product" && _id != ^._id && available == true][0..3]{
        _id,
        name,
        image,
        'price': price * 100,
        available
        }
    }
}`;
