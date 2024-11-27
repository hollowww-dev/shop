import { CategoryInput, DetailInput } from "@/components/sections/sanity/customInputs";
import { type Rule } from "sanity";

const Product = {
	name: "product",
	title: "Product",
	type: "document",
	fields: [
		{
			name: "name",
			title: "Name",
			type: "string",
			validation: (rule: Rule) =>
				rule
					.required()
					.error("Name is required.")
					.max(60)
					.warning("For the best SEO results, name should be less than 60 characters."),
		},
		{
			name: "description",
			title: "Description",
			type: "string",
			validation: (rule: Rule) =>
				rule
					.required()
					.error("Description is required.")
					.max(10000)
					.warning("For the best SEO results, description should be less than 1000 characters."),
		},
		{
			name: "category",
			title: "Category",
			type: "string",
			components: {
				input: CategoryInput,
			},
			validation: (rule: Rule) => rule.required(),
		},
		{
			name: "details",
			title: "Details",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						{
							name: "detail",
							title: "Details",
							type: "string",
							components: {
								input: DetailInput,
							},
							validation: (rule: Rule) => rule.required(),
						},
						{
							name: "answer",
							title: "Answer",
							type: "string",
							validation: (rule: Rule) => rule.required(),
						},
					],
				},
			],
			description: "Table of details of the product displayed on the product page.",
		},
		{
			name: "price",
			title: "Price",
			type: "number",
			validation: (rule: Rule) => rule.required().error("Price is required."),
			description: "Price in Euros",
		},
		{
			name: "image",
			title: "Image",
			type: "image",
			validation: (rule: Rule) => rule.required().error("Image is required."),
			description: "Primary image of the product.",
		},
		{
			name: "gallery",
			title: "Gallery",
			type: "array",
			of: [{ type: "image" }],
			description: "Additional images of the product.",
		},
		{
			name: "stock",
			title: "Stock",
			type: "number",
			validation: (rule: Rule) => rule.required().min(0),
		},
		{
			name: "featured",
			title: "Featured Products",
			type: "array",
			of: [{ name: "product", title: "Product", type: "reference", to: [{ type: "product" }], weak: true }],
			validation: (rule: Rule) => rule.min(4),
			description: "Minimum of 4, if empty, will fill with newest products.",
		},
	],
};

export default Product;
