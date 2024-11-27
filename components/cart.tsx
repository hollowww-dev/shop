"use client";

import { useState } from "react";
import Image from "next/image";

import { useShoppingCart } from "use-shopping-cart";
import { type CartEntry } from "use-shopping-cart/core";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { createCheckoutSession } from "@/actions";
import { useToast } from "@/hooks/use-toast";

import { IoCloseOutline } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";

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
					unoptimized
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
	const [loading, setLoading] = useState(false);
	const { cartCount, cartDetails, formattedTotalPrice, handleCartClick, shouldDisplayCart, redirectToCheckout } =
		useShoppingCart();
	const { toast, dismiss } = useToast();
	const handleCheckout = async () => {
		setLoading(true);
		try {
			if (!cartDetails) {
				throw new Error("Cart is empty.");
			}
			const { sessionId } = await createCheckoutSession(cartDetails);
			await redirectToCheckout(sessionId);
		} catch (error) {
			setLoading(false);
			if (error instanceof Error) {
				toast({ title: "Something went wrong.", description: error.message, variant: "destructive" });
			}
		}
	};
	return (
		<Sheet onOpenChange={handleCartClick} open={shouldDisplayCart}>
			<SheetTrigger onClick={() => dismiss()} asChild>
				<Button variant='ghost' className='p-2 text-2xl relative'>
					<AiOutlineShopping />
					{cartCount ?
						<div className='flex justify-center items-center absolute bottom-[2px] right-[2px] w-[17px] h-[17px] right-0 rounded-full text-[10px] bg-background border'>
							{cartCount < 99 ? cartCount : 99}
						</div>
					:	null}
				</Button>
			</SheetTrigger>
			<SheetContent className='flex flex-col'>
				<SheetTitle>Cart {cartCount && `(${cartCount})`}</SheetTitle>
				<ScrollArea className='flex-1 py-3'>
					{cartDetails &&
						Object.values(cartDetails).map((entry: CartEntry) => <CartItem entry={entry} key={entry.id} />)}
				</ScrollArea>
				<div className='flex flex-col gap-2'>
					<div className='flex justify-between items-center'>
						<span className='small'>Total:</span>
						<span>{formattedTotalPrice}</span>
					</div>
					<Button disabled={loading || !cartCount} onClick={handleCheckout}>
						{!loading ? "Checkout" : "Redirecting..."}
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default Cart;
