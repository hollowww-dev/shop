"use client";

import { useShoppingCart } from "use-shopping-cart";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { type CartEntry } from "use-shopping-cart/core";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IoCloseOutline } from "react-icons/io5";

const CartItem = ({ entry }: { entry: CartEntry }) => {
	const { decrementItem } = useShoppingCart();

	return (
		<Card className='[&:not(:first-child)]:mt-2'>
			<CardContent className='relative py-2 flex flex-row gap-2'>
				<IoCloseOutline
					className=' absolute top-2 right-2 text-lg text-foreground/50 hover:text-foreground/80 cursor-pointer'
					onClick={() => decrementItem(entry.id)}
				/>
				<Image
					src={entry.image!}
					alt={entry.name}
					width={60}
					height={60}
					className='self-start rounded-full p-1 border border-border'
				/>
				<div className='py-0 flex flex-col self-center'>
					<CardTitle className='text-lg'>
						{entry.name} {entry.quantity > 1 && `(${entry.quantity})`}
					</CardTitle>
					<span className='muted'>{entry.formattedValue}</span>
				</div>
			</CardContent>
		</Card>
	);
};

const Cart = () => {
	const { cartCount, cartDetails, handleCartClick, shouldDisplayCart } = useShoppingCart();
	return (
		<Sheet onOpenChange={handleCartClick} open={shouldDisplayCart}>
			<SheetTrigger asChild>
				<Button variant='ghost'>Cart</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetTitle>Cart {cartCount && `(${cartCount})`}</SheetTitle>
				<ScrollArea className='h-full py-3'>
					{cartDetails &&
						Object.values(cartDetails).map((entry: CartEntry) => <CartItem entry={entry} key={entry.id} />)}
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
};

export default Cart;
