import type { NextConfig } from 'next'
import createNextPluginPreval from 'next-plugin-preval/config'
const withNextPluginPreval = createNextPluginPreval()

const nextConfig: NextConfig = withNextPluginPreval({
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
            },
        ],
    },
})

export default nextConfig
