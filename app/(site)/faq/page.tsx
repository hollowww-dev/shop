import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import FAQ from "@/lib/faq.preval";
import Link from "next/link";

export default async function Page() {
	return (
		<main className='container mx-auto flex flex-col gap-6 lg:gap-12'>
			<div className='flex flex-col gap-2'>
				<h2>Frequently Asked Questions</h2>
			</div>

			{FAQ ?
				<Accordion type='single' className='w-full' collapsible>
					{FAQ.map((entry) => (
						<AccordionItem value={entry.question} key={entry._key}>
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
