import { SanityDocument } from "next-sanity";
import { Rule } from "sanity";

const PortfolioAlbum = {
	name: "portfolioAlbum",
	title: "Portfolio Album",
	type: "document",
	fields: [
		{ name: "title", title: "Title", type: "string", validation: (rule: Rule) => rule.required().max(60) },
		{
			name: "description",
			title: "Description",
			type: "string",
			validation: (rule: Rule) => rule.required().max(400),
		},
		{
			name: "cover",
			title: "Cover",
			type: "image",
			validation: (rule: Rule) => rule.required(),
		},
		{
			name: "products",
			title: "Products",
			type: "array",
			of: [
				{
					title: "Product",
					type: "reference",
					to: [{ type: "product", validation: (rule: Rule) => rule.required() }],
					validation: (rule: Rule) =>
						rule.required().custom((items) => {
							if (!Array.isArray(items)) {
								return true;
							}
							const ids = items.map((item) => item?._ref).filter((ref) => !!ref);
							const hasDuplicates = ids.some((id, index) => ids.indexOf(id) !== index);
							return hasDuplicates ? "Each product must be unique" : true;
						}),
					options: {
						disableNew: true,
						filter: ({ document }: { document: SanityDocument }) => {
							const selectedProductIds =
								document?.products?.map((product: SanityDocument) => product._ref) || [];
							return {
								filter: `!(_id in $selectedProductIds)`,
								params: {
									selectedProductIds,
								},
							};
						},
					},
				},
			],
		},
	],
};

export default PortfolioAlbum;
