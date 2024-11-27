import Link from "next/link";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/shadcn/accordion";

import FAQ from "@/lib/faq.preval";

export default async function Page() {
	return (
		<main className='container mx-auto flex flex-col gap-6 lg:gap-12'>
			<h2>Frequently Asked Questions</h2>
			{FAQ ?
				<Accordion type='multiple' className='w-full'>
					{FAQ.map((entry, index) => (
						<AccordionItem value={`question ${index}`} key={index}>
							<AccordionTrigger className='text-lg text-semibold'>{entry.question}</AccordionTrigger>
							<AccordionContent>{entry.answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			:	<p>No entries.</p>}
			<span className='small self-center'>
				Didn&apos;t find your answer? <Link href='/aboutme'>Contact me</Link>
			</span>
		</main>
	);
}
