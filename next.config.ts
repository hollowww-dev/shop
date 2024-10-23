import type { NextConfig } from "next";
const createNextPluginPreval = require("next-plugin-preval/config");
const withNextPluginPreval = createNextPluginPreval();

const nextConfig: NextConfig = withNextPluginPreval({
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
			},
		],
	},
	experimental: {
		reactCompiler: true,
		turbo: {
			resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
		},
	},
});

export default nextConfig;
