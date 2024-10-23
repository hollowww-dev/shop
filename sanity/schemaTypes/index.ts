import { type SchemaTypeDefinition } from "sanity";
import Product from "./product";
import Settings from "./settings";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [Product, Settings],
};
