import Link from 'next/link'

import config from '@/lib/config.preval'
import footerPreval from '@/lib/footer.preval'

import { IoLogoFacebook, IoLogoInstagram, IoLogoPinterest, IoLogoTiktok, IoLogoYoutube } from 'react-icons/io5'

const Footer = () => {
    return (
        <footer className="container mx-auto pt-12 lg:pt-24 pb-2 flex flex-col gap-12 lg:gap-24 text-center justify-self-end">
            <div className="flex justify-center gap-12">
                {footerPreval.socialMedia.facebook && (
                    <Link href={footerPreval.socialMedia.facebook} target="_blank" aria-label="Facebook">
                        <IoLogoFacebook className="text-2xl text-foreground/80 hover:text-foreground cursor-pointer" />
                    </Link>
                )}
                {footerPreval.socialMedia.instagram && (
                    <Link href={footerPreval.socialMedia.instagram} target="_blank" aria-label="Instagram">
                        <IoLogoInstagram className="text-2xl text-foreground/80 hover:text-foreground cursor-pointer" />
                    </Link>
                )}
                {footerPreval.socialMedia.pinterest && (
                    <Link href={footerPreval.socialMedia.pinterest} target="_blank" aria-label="Pinterest">
                        <IoLogoPinterest className="text-2xl text-foreground/80 hover:text-foreground cursor-pointer" />
                    </Link>
                )}
                {footerPreval.socialMedia.tiktok && (
                    <Link href={footerPreval.socialMedia.tiktok} target="_blank" aria-label="TikTok">
                        <IoLogoTiktok className="text-2xl text-foreground/80 hover:text-foreground cursor-pointer" />
                    </Link>
                )}
                {footerPreval.socialMedia.youtube && (
                    <Link href={footerPreval.socialMedia.youtube} target="_blank" aria-label="YouTube">
                        <IoLogoYoutube className="text-2xl text-foreground/80 hover:text-foreground cursor-pointer" />
                    </Link>
                )}
            </div>
            {footerPreval.footerPages && (
                <div className="flex justify-center gap-2">
                    {footerPreval?.footerPages.map((page) => (
                        <Link key={page.title} href={`/page/${page.slug.current}`} className="no-underline hover:underline muted">
                            {page.title}
                        </Link>
                    ))}
                </div>
            )}
            <p className="muted">
                © {config.title} {new Date().getFullYear().toString()}
            </p>
        </footer>
    )
}

export default Footer
