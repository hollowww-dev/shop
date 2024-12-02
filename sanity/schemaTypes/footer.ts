import { Rule, SanityDocument, SlugSourceContext } from 'sanity'

const Footer = {
    name: 'footer',
    title: 'Footer',
    type: 'document',
    fields: [
        {
            name: 'footerPages',
            title: 'Footer pages',
            type: 'array',
            of: [
                {
                    name: 'page',
                    title: 'Page',
                    type: 'object',
                    fields: [
                        {
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                            validation: (rule: Rule) => rule.required(),
                        },
                        {
                            name: 'slug',
                            title: 'Slug',
                            type: 'slug',
                            description: 'Generate for hyperlink address.',
                            options: {
                                source: (_doc: SanityDocument, options: SlugSourceContext) => {
                                    if (options.parent && typeof options.parent === 'object' && 'title' in options.parent) {
                                        return (options.parent as { title: string }).title
                                    }
                                    return ''
                                },
                                maxLength: 200,
                            },
                            validation: (rule: Rule) => rule.required(),
                        },
                        {
                            name: 'content',
                            title: 'Content',
                            type: 'array',
                            of: [{ type: 'block' }],
                            validation: (rule: Rule) => rule.required(),
                        },
                    ],
                },
            ],
        },
        {
            name: 'socialMedia',
            title: 'Social media',
            type: 'object',
            fields: [
                {
                    name: 'instagram',
                    title: 'Instagram',
                    type: 'url',
                },
                {
                    name: 'facebook',
                    title: 'Facebook',
                    type: 'url',
                },
                {
                    name: 'pinterest',
                    title: 'Pinterest',
                    type: 'url',
                },
                {
                    name: 'tiktok',
                    title: 'Tik Tok',
                    type: 'url',
                },
                {
                    name: 'youtube',
                    title: 'YouTube',
                    type: 'url',
                },
            ],
            validation: (rule: Rule) => rule.required(),
        },
    ],
    options: {
        singleton: true,
    },
}

export default Footer
