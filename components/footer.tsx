import { IoLogoFacebook, IoLogoInstagram, IoLogoPinterest, IoLogoTiktok, IoLogoYoutube } from "react-icons/io5";
import config from "@/lib/config.preval";
import Link from "next/link";
import socialMediaPreval from "@/lib/socialMedia.preval";

const Footer = () => {
	return (
		<footer className='container mx-auto pt-12 lg:pt-24 pb-2 flex flex-col gap-12 lg:gap-24 text-center'>
			<div className='flex justify-center gap-12'>
				{socialMediaPreval.facebook && (
					<Link href={socialMediaPreval.facebook}>
						<IoLogoFacebook className='text-2xl text-foreground/80 hover:text-foreground cursor-pointer' />
					</Link>
				)}
				{socialMediaPreval.instagram && (
					<Link href={socialMediaPreval.instagram}>
						<IoLogoInstagram className='text-2xl text-foreground/80 hover:text-foreground cursor-pointer' />
					</Link>
				)}
				{socialMediaPreval.pinterest && (
					<Link href={socialMediaPreval.pinterest}>
						<IoLogoPinterest className='text-2xl text-foreground/80 hover:text-foreground cursor-pointer' />
					</Link>
				)}
				{socialMediaPreval.tiktok && (
					<Link href={socialMediaPreval.tiktok}>
						<IoLogoTiktok className='text-2xl text-foreground/80 hover:text-foreground cursor-pointer' />
					</Link>
				)}
				{socialMediaPreval.youtube && (
					<Link href={socialMediaPreval.youtube}>
						<IoLogoYoutube className='text-2xl text-foreground/80 hover:text-foreground cursor-pointer' />
					</Link>
				)}
			</div>
			<p className='muted'>
				© {config.title} {new Date().getFullYear()}
			</p>
		</footer>
	);
};

export default Footer;
