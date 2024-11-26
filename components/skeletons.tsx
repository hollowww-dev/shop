import { VscListFilter, VscSettings } from "react-icons/vsc";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export const PortfolioSkeleton = () => {
	return (
		<Card className="p-3">
			<AspectRatio ratio={1} className='relative'>
				<Skeleton className='w-full h-full' />
			</AspectRatio>
		</Card>
	);
};

export const PortfoliosSkeleton = () => {
	return (
		<section className='flex flex-col gap-2'>
			<div className='flex gap-2 self-end'>
				<Button variant={"outline"} size='icon' disabled>
					<VscListFilter />
				</Button>
			</div>
			<div className='grid md:grid-cols-2 gap-6 py-3'>
				{Array.from({ length: 2 }).map((_, i) => (
					<PortfolioSkeleton key={i} />
				))}
			</div>
		</section>
	);
};

export const ProductSkeleton = () => {
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

export const ProductsSkeleton = () => {
	return (
		<section className='flex flex-col gap-2'>
			<div className='flex gap-2 self-end'>
				<Button variant={"outline"} size='icon' disabled>
					<VscSettings />
				</Button>
				<Button variant={"outline"} size='icon' disabled>
					<VscListFilter />
				</Button>
			</div>
			<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-3'>
				{Array.from({ length: 3 }).map((_, i) => (
					<ProductSkeleton key={i} />
				))}
			</div>
		</section>
	);
};

export const ProductDetailsSkeleton = () => {
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
