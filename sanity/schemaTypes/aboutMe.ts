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
						{
							name: "key",
							title: "Key",
							type: "string",
							validation: (rule: Rule) => rule.required().max(64),
						},
						{
							name: "value",
							title: "Value",
							type: "array",
							description: "Each value is a seperate line.",
							of: [{ name: "line", title: "Line", type: "string" }],
							validation: (rule: Rule) => rule.required().max(8),
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
						{ name: "key", title: "Key", type: "string", validation: (rule: Rule) => rule.required() },
						{ name: "value", title: "Value", type: "string", validation: (rule: Rule) => rule.required() },
						{
							name: "hidden",
							title: "Hidden",
							description: "If true, value will be shown only after clicking by user.",
							type: "boolean",
							options: { initialValue: false },
							validation: (rule: Rule) => rule.required(),
						},
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
