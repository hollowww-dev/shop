"use client";

import { useShoppingCart } from "use-shopping-cart";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { type CartEntry } from "use-shopping-cart/core";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import { Badge } from "./ui/badge";

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
				<Button variant='ghost' className='p-0 lg:p-2 text-2xl relative'>
					<AiOutlineShopping />
					{cartCount ?
						<div className='flex justify-center items-center absolute bottom-[2px] right-[2px] w-[17px] h-[17px] right-0 rounded-full text-[10px] bg-background border'>
							{cartCount < 99 ? cartCount : 99}
						</div>
					:	null}
				</Button>
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
