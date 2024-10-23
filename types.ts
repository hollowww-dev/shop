import { Product } from "./sanity.types";

export type ProductType = Omit<Product, "featured"> & { featured?: Product[] };
