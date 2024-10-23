import { IoLogoFacebook, IoLogoInstagram, IoLogoPinterest } from "react-icons/io5";
import config from "@/lib/config.preval";

const Footer = () => {
	return (
		<footer className='container mx-auto pt-12 lg:pt-24 pb-2 flex flex-col gap-12 lg:gap-24 text-center'>
			<div className='flex justify-center gap-12'>
				<IoLogoFacebook className='text-2xl text-foreground/80 hover:text-foreground cursor-pointer' />
				<IoLogoInstagram className='text-2xl text-foreground/80 hover:text-foreground cursor-pointer' />
				<IoLogoPinterest className='text-2xl text-foreground/80 hover:text-foreground cursor-pointer' />
			</div>
			<p className='muted'>
				© {config.title} {new Date().getFullYear()}
			</p>
		</footer>
	);
};

export default Footer;
