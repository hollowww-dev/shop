import preval from 'next-plugin-preval'

import { client } from '../sanity/lib/client'
import { ABOUTME } from '../sanity/lib/queries'

import { AboutMe } from '../sanity.types'

async function getAboutMe() {
    const { headline, description, avatar, contact, information }: AboutMe = await client.fetch(
        ABOUTME,
        {},
        {
            cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'force-cache',
        }
    )
    return {
        headline,
        description,
        avatar,
        contact,
        information,
    }
}
export default preval(getAboutMe())
