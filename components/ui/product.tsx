"use client"

import { PRODUCTSResult } from "@/sanity.types"
import { urlFor } from "@/sanity/lib/image"
import { formatCurrencyString } from "use-shopping-cart/core"
import { Badge } from "./badge"
import { Card, CardHeader, CardContent } from "./card"
import Image from "next/image"
import { AspectRatio } from "./aspect-ratio"
import config from "@/lib/config"

const Product = ({product}: {product: PRODUCTSResult[number]}) => {
    return (
        <Card key={product.id} className="relative">
        <CardHeader>
          <AspectRatio ratio={1} className="relative">
            <Image src={urlFor(product.image).width(300).height(300).url()} alt={product.name} className="aspect-square object-cover rounded-md" fill/>
          </AspectRatio>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
            <h4>{product.name}</h4>
            <Badge variant="outline">{formatCurrencyString({value: product.price, currency: config.currency})}</Badge>
        </CardContent>
        <Badge variant={product.available ? "secondary" : "default"} className="absolute top-5 right-5">{product.available ? "Available" : "Sold out"}</Badge>
      </Card>
    )
}

export default Product;