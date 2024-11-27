"use client";

import { useEffect, useState } from "react";

import { Autocomplete } from "@sanity/ui";
import { groq } from "next-sanity";
import { set, StringInputProps, unset, useClient } from "sanity";

export const DetailInput = (props: StringInputProps) => {
	const [listItems, setListItems] = useState<Array<string>>([]);
	const client = useClient();

	useEffect(() => {
		const getDetails = async () => {
			const result: string[] = await client.fetch(groq`array::unique(*[_type == "product"].details[].detail)`);
			setListItems(result);
		};
		getDetails();
	}, [client]);

	const [newValue, setnewValue] = useState<string | undefined>();

	const values = [newValue, ...listItems].filter((value): value is string => typeof value === "string");

	return (
		<Autocomplete
			id='detail-input'
			options={values.map((value) => ({ value }))}
			value={props.value}
			onChange={(value) => (value ? props.onChange(set(value)) : props.onChange(unset()))}
			onQueryChange={(query) => {
				if (query === "" || query === null) {
					setnewValue(undefined);
					return;
				}
				if (listItems.includes(query)) {
					setnewValue(undefined);
					return;
				}
				setnewValue(query);
			}}
		/>
	);
};

export const CategoryInput = (props: StringInputProps) => {
	const [listItems, setListItems] = useState<Array<string>>([]);
	const client = useClient();

	useEffect(() => {
		const getDetails = async () => {
			const result: string[] = await client.fetch(groq`array::unique(*[_type == "product"].category)`);
			setListItems(result);
		};
		getDetails();
	}, [client]);

	const [newValue, setnewValue] = useState<string | undefined>();

	const values = [newValue, ...listItems].filter((value): value is string => typeof value === "string");

	return (
		<Autocomplete
			id='detail-input'
			options={values.map((value) => ({ value }))}
			value={props.value}
			onChange={(value) => (value ? props.onChange(set(value)) : props.onChange(unset()))}
			onQueryChange={(query) => {
				if (query === "" || query === null) {
					setnewValue(undefined);
					return;
				}
				if (listItems.includes(query)) {
					setnewValue(undefined);
					return;
				}
				setnewValue(query);
			}}
		/>
	);
};
