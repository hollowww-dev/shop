import { Rule } from 'sanity'

const Shippings = {
    name: 'shipping',
    title: 'Shipping settings',
    type: 'document',
    fields: [
        {
            name: 'shippings',
            title: 'Shippings',
            type: 'array',
            validation: (rule: Rule) => rule.required(),
            of: [
                {
                    name: 'entry',
                    title: 'Entry',
                    type: 'object',
                    fields: [
                        {
                            name: 'name',
                            title: 'Name',
                            type: 'string',
                            validation: (rule: Rule) => rule.required().max(120),
                        },
                        {
                            name: 'time',
                            title: 'Estimated delivery time',
                            description: 'Amount of days.',
                            type: 'number',
                            validation: (rule: Rule) => rule.required().greaterThan(0).lessThan(365),
                        },
                        {
                            name: 'price',
                            title: 'Price',
                            type: 'number',
                            validation: (rule: Rule) => rule.required(),
                        },
                    ],
                },
            ],
        },
        {
            name: 'worldwideShipping',
            title: 'Worldwide shipping',
            description: 'Sets shipping only in Europe if unchecked.',
            type: 'boolean',
            options: {
                layout: 'switch',
                initialValue: false,
            },
        },
    ],
    options: {
        singleton: true,
    },
}

export default Shippings
