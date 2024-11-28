import { Rule } from 'sanity'

const FAQ = {
    name: 'faq',
    title: 'FAQ',
    type: 'document',
    fields: [
        {
            name: 'entries',
            title: 'Entries',
            type: 'array',
            of: [
                {
                    name: 'entry',
                    title: 'Entry',
                    type: 'object',
                    fields: [
                        {
                            name: 'question',
                            title: 'Question',
                            type: 'string',
                            validation: (rule: Rule) => rule.required().max(180),
                        },
                        {
                            name: 'answer',
                            title: 'Answer',
                            type: 'string',
                            validation: (rule: Rule) => rule.required(),
                        },
                    ],
                },
            ],
        },
    ],
    options: {
        singleton: true,
    },
}

export default FAQ
