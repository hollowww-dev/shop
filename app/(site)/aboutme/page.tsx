import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import aboutMePreval from "@/lib/aboutMe.preval";
import { urlFor } from "@/sanity/lib/image";

export default async function Page() {
	return (
		<main className='container mx-auto flex flex-col gap-6 lg:gap-12'>
			<div className='flex gap-3 lg:gap-12 justify-between items-center'>
				<Avatar className='w-32 h-32 lg:w-48 lg:h-48 self-start'>
					<AvatarImage src={urlFor(aboutMePreval.avatar).width(400).height(400).url()} alt='Avatar Image' />
					<AvatarFallback>
						<Skeleton />
					</AvatarFallback>
				</Avatar>
				<div className='flex flex-col gap-2'>
					<h2>{aboutMePreval.headline}</h2>
					<p className='lead hidden lg:block'>{aboutMePreval.description}</p>
				</div>
			</div>
			<p className='lead lg:hidden'>{aboutMePreval.description}</p>
		</main>
	);
}
