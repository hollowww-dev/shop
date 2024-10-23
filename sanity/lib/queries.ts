import { groq } from "next-sanity";

export const SETTINGS = groq`*[_type == "settings"][0]{
title,
currency
}`;

export const PRODUCTS = groq`*[_type == "product"]{
    'id':_id,
    name,
    image,
    'price': price * 100,
    available
}`;

export const PRODUCT = groq`*[_id == $id][0]{
    'id':_id,
    name,
    description,
    details,
    image,
    gallery,
    'price': price * 100,
    available,
    defined(featured) => {
        featured
    },
    !defined(featured) => {
        'featured': *[_type == "product" && _id != ^._id && available == true][0..4]{
        'id':_id,
        name,
        image,
        'price': price * 100,
        available
        }
    }
}`;
