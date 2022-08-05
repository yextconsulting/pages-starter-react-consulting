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
		<div className="Locator-searchWrapper">
			<h1 className="Locator-title Heading--lead">
				{ title }
			</h1>
			<div className="Locator-searchTitle">
				{ searchTitle }
			</div>
			<FilterSearch
				label=""
				placeholder={ placeholderText }
				searchFields={ searchFields }
				searchOnSelect={ true }
			/>
		</div>
	)
}
