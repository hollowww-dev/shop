import { groq } from "next-sanity";

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
    image,
    gallery,
    'price': price * 100,
    available
}`