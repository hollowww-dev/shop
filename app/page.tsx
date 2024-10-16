import { PRODUCTSResult } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { PRODUCTS } from "@/sanity/lib/queries";
import Header from "@/components/ui/header";
import Product from "@/components/ui/product";

export default async function Home() {
  const products = await client.fetch<Promise<PRODUCTSResult>>(PRODUCTS, {}, {cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache"})
  return (
  <>
    <Header />
    <main className="container mx-auto">
      <div className="grid grid-cols-3 gap-6 py-3">
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </main>
  </>
  );
}
