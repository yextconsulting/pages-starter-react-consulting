import { FilterSearch } from "@yext/search-ui-react";

const searchFields = [
	{fieldApiName: "builtin.location", entityType: "location" },
];

type SearchBoxProps = {
	title: string,
	searchTitle: string,
	placeholderText?: string,
}
// TODO: add searchbutton, geolocate button, and filters
export default function SearchBox(props: SearchBoxProps) {
	const { title, searchTitle, placeholderText } = props;
	return (
		<div className="shadow-brand-shadow p-6 ">
			<h1 className="Heading--lead mb-4">
				{ title }
			</h1>
			<div className="mb-2">
				{ searchTitle }
			</div>
			<div className="relative mb-8">
				<FilterSearch
					customCssClasses={{
						filterSearchContainer: "absolute w-full"
					}}
					label=""
					placeholder={ placeholderText }
					searchFields={ searchFields }
					searchOnSelect={ true }
				/>
			</div>
		</div>
	)
}
