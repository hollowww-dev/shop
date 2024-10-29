import { type SchemaTypeDefinition } from "sanity";
import Product from "./product";
import Settings from "./settings";
import SocialMedia from "./socialMedia";
import FAQ from "./FAQ";
import aboutMe from "./aboutMe";
import Shippings from "./shippings";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [Product, Settings, Shippings, SocialMedia, aboutMe, FAQ],
};
