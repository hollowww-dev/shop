import Header from '@/components/layout/header'
import Nav from '@/components/layout/nav'

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Nav />
            <Header />
            <main className="container mx-auto flex flex-col flex-grow gap-6 lg:gap-12">{children}</main>
        </>
    )
}
