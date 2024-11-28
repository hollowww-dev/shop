'use server'

import { headers } from 'next/headers'

import { groq } from 'next-sanity'
import { type CartDetails } from 'use-shopping-cart/core'
import { validateCartItems } from 'use-shopping-cart/utilities'

import stripe from '@/lib/stripe'
import { client } from '@/sanity/lib/client'
import { parseCartItem } from '@/lib/utils'
import shippingsPreval from '@/lib/shippings.preval'
import configPreval from '@/lib/config.preval'

import { ProductType } from '@/types'

export async function createCheckoutSession(cartDetails: CartDetails): Promise<{ sessionId: string } | { error: string }> {
    if (!process.env.NEXT_PUBLIC_SITE_URL) {
        return { error: 'Server configuration error: NEXT_PUBLIC_SITE_URL is not defined.' }
    }

    if (!cartDetails || Object.keys(cartDetails).length === 0) {
        return { error: 'Cart is empty or invalid. Please add items to your cart before proceeding.' }
    }

    try {
        const products: ProductType[] = await client.fetch(groq`*[_type == "product" && stock > 0]{
            _id,
            name,
            image,
            category,
            'price': price * 100,
        }`)

        if (!products || products.length === 0) {
            throw new Error('There was an error while connecting with our database. Please try again later.')
        }

        let line_items
        try {
            line_items = validateCartItems(
                products.map((item) => parseCartItem(item)),
                cartDetails
            )
        } catch (validationError) {
            console.error('Cart validation error:', validationError)
            throw new Error('There was an error validating your cart. Please check if all items are available.')
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success/{CHECKOUT_SESSION_ID}`,
            cancel_url: `${(await headers()).get('referer')}`,
            line_items,
            metadata: {
                sanityIds: JSON.stringify(
                    Object.values(cartDetails).map((item) => {
                        return { id: item.id, quantity: item.quantity }
                    })
                ),
            },
            shipping_options: shippingsPreval.shippings.map((shipping) => {
                return {
                    shipping_rate_data: {
                        display_name: shipping.name,
                        delivery_estimate: {
                            maximum: {
                                unit: 'business_day',
                                value: shipping.time,
                            },
                        },
                        fixed_amount: {
                            amount: shipping.price,
                            currency: configPreval.currency,
                        },
                        type: 'fixed_amount',
                    },
                }
            }),
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: shippingsPreval.worldwideShipping
                    ? []
                    : [
                          'AT',
                          'BE',
                          'BG',
                          'HR',
                          'CY',
                          'CZ',
                          'DK',
                          'EE',
                          'FI',
                          'FR',
                          'DE',
                          'GR',
                          'HU',
                          'IE',
                          'IT',
                          'LV',
                          'LT',
                          'LU',
                          'MT',
                          'NL',
                          'PL',
                          'PT',
                          'RO',
                          'SK',
                          'SI',
                          'ES',
                          'SE',
                      ],
            },
        })

        return { sessionId: session.id }
    } catch (error) {
        console.error('Stripe checkout session error:', error)

        if (error instanceof Error) {
            if (error.message.includes('Invalid')) {
                return { error: 'An error occurred while processing your cart. Please try again.' }
            }
            return { error: `Checkout session creation failed: ${error.message}` }
        }

        return { error: 'An unexpected error occurred. Please try again later.' }
    }
}
