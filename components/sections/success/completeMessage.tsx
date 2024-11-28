'use client'

import { useEffect } from 'react'

import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'

const CompleteMessage = ({ payment_status }: { payment_status: Stripe.Checkout.Session['payment_status'] }) => {
    const { cartCount, clearCart } = useShoppingCart()
    useEffect(() => {
        if (cartCount) {
            clearCart()
        }
    }, [cartCount, clearCart])

    switch (payment_status) {
        case 'unpaid':
            return <p>Your payment is being processed.</p>
        case 'paid':
            return <p>Thank you for your purchase!</p>
    }
}

export default CompleteMessage
