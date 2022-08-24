import { FilterSearch } from "@yext/search-ui-react";
import GeolocateButton from "./GeolocateButton";
import SearchButton from "./SearchButton";

// TODO: Where should config like this go and if possible get from streams definition?
const searchFields = [
	{ fieldApiName: "builtin.location", entityType: "location" },
];

type SearchBoxProps = {
	title: string,
	subTitle: string,
	placeholderText?: string,
}
// TODO: add filters
// TODO: look into selecting first autocomplete option on enter
export default function SearchBox(props: SearchBoxProps) {
	const { title, subTitle, placeholderText } = props;
	return (
		<div className="shadow-brand-shadow p-6">
			<h1 className="Heading--lead mb-4">
				{ title }
			</h1>
			<div className="mb-2 text-brand-gray-400">
				{ subTitle }
			</div>
			<div className="flex items-center">
				<div className="relative mb-8 w-full">
					<FilterSearch
						customCssClasses={{
							filterSearchContainer: "absolute w-full",
						}}
						label=""
						placeholder={ placeholderText }
						searchFields={ searchFields }
						searchOnSelect={ true }
					/>
					<SearchButton className="absolute right-4 translate-y-1/2" />
				</div>
				<GeolocateButton className="ml-4" />
			</div>
		</div>
	)
}
