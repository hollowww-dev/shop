import { type Rule } from 'sanity';

const Product = {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (rule: Rule) => rule.required().error('Name is required.').max(60).warning('For the best SEO results, name should be less than 60 characters.'),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string',
            validation: (rule: Rule) => rule.required().error('Description is required.').max(10000).warning('For the best SEO results, description should be less than 1000 characters.'),
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: (rule: Rule) => rule.required().error('Price is required.'),
            description: 'Price in Euros',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            validation: (rule: Rule) => rule.required().error('Image is required.'),
            description: 'Primary image of the product.',
        },
        {
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [{ type: 'image' }],
            description: 'Additional images of the product.',
        },
        {
            name: 'available',
            title: 'Available',
            type: 'boolean',
            validation: (rule: Rule) => rule.required(),
            initialValue: true,
            options: {
                layout: 'switch',
                list: [false, true],
            },
        }
    ],
}

export default Product;