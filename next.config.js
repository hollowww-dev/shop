const createNextPluginPreval = require('next-plugin-preval/config')
const withNextPluginPreval = createNextPluginPreval()

module.exports = withNextPluginPreval({
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
            },
        ],
    },
})
