import { type SchemaTypeDefinition } from "sanity";
import Product from "./product";
import Settings from "./settings";
import SocialMedia from "./socialMedia";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [Product, Settings, SocialMedia],
};
