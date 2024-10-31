import { Rule } from "sanity";

const aboutMe = {
	name: "aboutMe",
	title: "About me",
	type: "document",
	fields: [
		{ name: "headline", title: "Headline", type: "string", validation: (rule: Rule) => rule.required().max(120) },
		{
			name: "description",
			title: "Description",
			type: "string",
			validation: (rule: Rule) => rule.required().max(3600),
		},
		{ name: "avatar", title: "Avatar", type: "image", validation: (rule: Rule) => rule.required() },
		{
			name: "information",
			title: "Information",
			type: "array",
			of: [
				{
					name: "entry",
					title: "Entry",
					type: "object",
					fields: [
						{ name: "key", title: "Key", type: "string" },
						{
							name: "value",
							title: "Value",
							type: "array",
							of: [{ name: "line", title: "Line", type: "string" }],
						},
					],
				},
			],
		},
		{
			name: "contact",
			title: "Contact",
			type: "array",
			of: [
				{
					name: "entry",
					title: "Entry",
					type: "object",
					fields: [
						{ name: "key", title: "Key", type: "string" },
						{ name: "value", title: "Value", type: "string" },
						{ name: "hidden", title: "Hidden", type: "boolean" },
					],
				},
			],
		},
	],
	options: {
		singleton: true,
	},
};

export default aboutMe;
