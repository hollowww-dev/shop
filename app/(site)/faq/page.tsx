import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import FAQ from "@/lib/faq.preval";
import Link from "next/link";

export default async function Page() {
	return (
		<main className='container mx-auto flex flex-col gap-6 lg:gap-12'>
			<h2>Frequently Asked Questions</h2>
			{FAQ ?
				<Accordion type='multiple' collapsible className='w-full'>
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
