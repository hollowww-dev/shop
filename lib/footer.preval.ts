import preval from 'next-plugin-preval'

import { client } from '../sanity/lib/client'
import { FOOTER } from '../sanity/lib/queries'
import { Footer } from '@/sanity.types'

async function getFooter() {
    const footer: Footer = await client.fetch(
        FOOTER,
        {},
        {
            cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'force-cache',
        }
    )
    return footer
}
export default preval(getFooter())
