import { AiOutlineMenu } from "react-icons/ai";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

const Hamburger = () => {
	return (
		<Sheet>
			<SheetTrigger className='lg:hidden' asChild>
				<Button variant='ghost' className='p-2 text-2xl'>
					<AiOutlineMenu />
				</Button>
			</SheetTrigger>
			<SheetContent side='left'>
				<SheetTitle>Menu</SheetTitle>
			</SheetContent>
		</Sheet>
	);
};

export default Hamburger;
