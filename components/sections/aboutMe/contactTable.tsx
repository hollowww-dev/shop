"use client";

import { useState } from "react";

import { Table, TableBody, TableCell, TableRow } from "@/components/shadcn/table";
import { Button } from "@/components/shadcn/button";

import { AboutMe } from "@/sanity.types";

const ContactTableRow = ({ line, hidden }: { line?: string; hidden: boolean }) => {
	const [show, setShow] = useState(false);

	return (
		<TableCell className='w-2/3'>
			{!hidden || show ?
				<p>{line}</p>
			:	<Button onClick={() => setShow(true)} className='h-[1.75rem]'>
					Show
				</Button>
			}
		</TableCell>
	);
};

const ContactTable = ({ contact }: { contact: AboutMe["contact"] }) => {
	return (
		<Table>
			<TableBody key='1'>
				{contact?.map((entry) => (
					<TableRow key={entry._key}>
						<TableCell className='font-medium w-1/3'>{entry.key}</TableCell>
						<ContactTableRow line={entry.value} hidden={entry.hidden || false} />
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default ContactTable;
