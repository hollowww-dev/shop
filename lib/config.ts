if(!process.env.NEXT_PUBLIC_SITE_URL) {
    throw new Error('SITE_URL VARIABLE NOT PROVIDED.')
}

const config = {
    siteName: "Vincent Van Gogh's Store",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    currency: 'EUR'
}

export default config