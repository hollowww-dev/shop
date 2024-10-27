import { type SchemaTypeDefinition } from "sanity";
import Product from "./product";
import Settings from "./settings";
import SocialMedia from "./socialMedia";
import FAQ from "./FAQ";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [Product, Settings, SocialMedia, FAQ],
};
