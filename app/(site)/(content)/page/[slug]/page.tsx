import footerPreval from '@/lib/footer.preval'
import { PortableText } from 'next-sanity'

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = await params
    const page = footerPreval.footerPages?.find((page) => page.slug.current === slug)
    if (!page) {
        throw new Error('Page you are trying to reach doesnt exist.')
    }
    return (
        <div className="flex flex-col gap-4">
            <h3>{page.title}</h3>
            <PortableText value={page.content} />
        </div>
    )
}
