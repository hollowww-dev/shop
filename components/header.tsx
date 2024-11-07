import Link from "next/link";
import { Button } from "@/components/ui/button";
import config from "@/lib/config.preval";
import Cart from "@/components/cart";
import Hamburger from "./hamburger";

const Header = () => {
	return (
		<>
			<nav className='sticky top-0 z-10 container mx-auto py-2 flex justify-between items-center bg-background border-b border-x rounded-b-md border-border shadow'>
				<div className='hidden lg:flex gap-6'>
					<Button variant='ghost' size='lg' asChild>
						<Link href='/aboutme' className='no-underline'>
							About me
						</Link>
					</Button>
					<Button variant='ghost' size='lg' asChild>
						<Link href='/faq' className='no-underline'>
							FAQ
						</Link>
					</Button>
				</div>
				<Hamburger />
				<Cart />
			</nav>
			<header className='container mx-auto py-12 lg:py-24 text-center'>
				<h1>
					<Link href={config.siteUrl} className='no-underline'>
						{config.title}
					</Link>
				</h1>
			</header>
		</>
	);
};

export default Header;
