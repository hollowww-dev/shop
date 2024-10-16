"use client"

import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./sheet"
import { Button } from "./button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import Image from "next/image"
import { type CartEntry } from "use-shopping-cart/core"
import { ScrollArea } from "./scroll-area"

const CartItem = ({entry}: {entry: CartEntry}) => {
    return (
        <Card>
            <CardContent className="py-2 flex flex-row gap-2">
                <Image src={entry.image!} alt={entry.name} width={60} height={60} className="self-start rounded-full p-1 border border-border"/>
                <div className="py-0 flex flex-col self-center">
                    <CardTitle className="text-lg">
                        {entry.name} {entry.quantity > 1 && `(${entry.quantity})`}
                    </CardTitle>
                    <span className="muted">
                        {entry.formattedValue}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}

const Cart = () => {
    const {cartCount, cartDetails, handleCartClick, shouldDisplayCart} = useShoppingCart()
    return (
        <Sheet onOpenChange={handleCartClick} open={shouldDisplayCart}>
            <SheetTrigger asChild>
                <Button variant="ghost">
                    Cart
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetTitle>Cart {cartCount && `(${cartCount})`}</SheetTitle>
                <ScrollArea className="py-3">
                    {cartDetails && Object.values(cartDetails).map((entry: CartEntry) => <CartItem entry={entry} />)}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )

}

export default Cart;