import { groq } from "next-sanity";

export const PRODUCTS = groq`*[_type == "product"]{
    'id':_id,
    name,
    image,
    'price': price * 100,
    available
}`;