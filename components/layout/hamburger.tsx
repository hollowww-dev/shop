import Link from 'next/link'

import { Button } from '@/components/shadcn/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from '@/components/shadcn/sheet'

import { AiOutlineMenu } from 'react-icons/ai'

const Hamburger = () => {
    return (
        <Sheet>
            <SheetTrigger className="lg:hidden" asChild>
                <Button variant="ghost" className="p-2 text-2xl">
                    <AiOutlineMenu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetTitle>Menu</SheetTitle>
                <ul className="pl-3 pt-3 flex flex-col gap-3">
                    <li>
                        <SheetClose asChild>
                            <Link href="/shop" className="text-xl no-underline">
                                Shop
                            </Link>
                        </SheetClose>
                    </li>
                    <li>
                        <SheetClose asChild>
                            <Link href="/portfolio" className="text-xl no-underline">
                                Portfolio
                            </Link>
                        </SheetClose>
                    </li>
                    <li>
                        <SheetClose asChild>
                            <Link href="/aboutme" className="text-xl no-underline">
                                About me
                            </Link>
                        </SheetClose>
                    </li>
                    <li>
                        <SheetClose asChild>
                            <Link href="/faq" className="text-xl no-underline">
                                FAQ
                            </Link>
                        </SheetClose>
                    </li>
                </ul>
            </SheetContent>
        </Sheet>
    )
}

export default Hamburger
