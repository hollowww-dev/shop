import { Rule } from "sanity";

const aboutMe = {
	name: "aboutMe",
	title: "About Me",
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
	],
	options: {
		singleton: true,
	},
};

export default aboutMe;
