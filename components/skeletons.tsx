import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export const ProductSkeleton = async () => {
	return (
		<Card>
			<CardHeader>
				<AspectRatio ratio={1} className='relative'>
					<Skeleton className='w-full h-full' />
				</AspectRatio>
			</CardHeader>
			<CardContent className='flex flex-col md:flex-row justify-between md:items-center gap-1 lg:gap-2'>
				<Skeleton className='w-full h-[1.875rem]' />
			</CardContent>
		</Card>
	);
};

export const ProductsSkeleton = async () => {
	return (
		<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-3'>
			{Array.from({ length: 3 }).map((_, i) => (
				<ProductSkeleton key={i} />
			))}
		</div>
	);
};

export const ProductDetailsSkeleton = async () => {
	return (
		<>
			<section className='flex flex-col gap-2'>
				<Skeleton className='w-full lg:w-1/3 h-[2.25rem]' />
				<div className='flex flex-col lg:flex-row gap-6 lg:gap-12'>
					<Skeleton className='w-full aspect-square shadow rounded-xl' />
					<div className='flex flex-col lg:self-center gap-6 lg:gap-12'>
						<span className='text-4xl self-center'>
							<Skeleton className='w-24 h-[2.5rem]' />
						</span>
						<div className='flex flex-1 flex-col lg:flex-row gap-2'>
							<Button size={"lg"} variant={"outline"} disabled>
								Add to cart
							</Button>
							<Button size={"lg"} disabled>
								Buy now
							</Button>
						</div>
					</div>
				</div>
			</section>
			<section className='flex flex-col gap-2'>
				<Skeleton className='w-full h-[4.25rem]' />
			</section>
		</>
	);
};
