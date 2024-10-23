const Settings = {
	name: "settings",
	title: "Settings",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{
			name: "currency",
			title: "Currency",
			type: "string",
		},
	],
	options: {
		singleton: true,
	},
};

export default Settings;
