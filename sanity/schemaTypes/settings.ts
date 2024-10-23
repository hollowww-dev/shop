import { Rule } from "sanity";

const Settings = {
	name: "settings",
	title: "Site settings",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Site title",
			type: "string",
			validation: (rule: Rule) => rule.required().max(60),
			defaultValue: "Untitled",
		},
		{
			name: "description",
			title: "Site description",
			type: "string",
			validation: (rule: Rule) => rule.required().max(300),
			defaultValue: "Example description",
		},
		{
			name: "currency",
			title: "Currency",
			type: "string",
			validation: (rule: Rule) => rule.required().length(3).uppercase(),
			description: "In three, uppercased letters' format - eg. EUR.",
			defaultValue: "EUR",
		},
	],
	options: {
		singleton: true,
	},
};

export default Settings;
