module.exports = {
	extends: ["next/core-web-vitals", "next/typescript"],
	plugins: ["eslint-plugin-react-compiler"],
	rules: {
		"react-compiler/react-compiler": "error",
	},
};