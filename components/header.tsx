import Link from "next/link";
import { Button } from "@/components/ui/button";
import config from "@/lib/config";
import Cart from "@/components/cart";

const Header = () => {
    return (
        <>
          <nav className="sticky top-0 z-10 container mx-auto py-2 flex justify-between items-center bg-background border-b border-x rounded-b-md border-border shadow">
            <div className="flex gap-6">
              <Button variant="ghost" size="lg" asChild><Link href="/" >Products</Link></Button>
              <Button variant="ghost" size="lg" asChild><Link href="/" >About me</Link></Button>
              <Button variant="ghost" size="lg" asChild><Link href="/" >FAQ</Link></Button>
            </div>
            <Cart />
          </nav>
          <header className="container mx-auto py-12 lg:py-24 text-center">
            <h1><Link href={config.siteUrl}>{config.siteName}</Link></h1>
          </header>
        </>
    )
}

export default Header;