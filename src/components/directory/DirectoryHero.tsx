import { useTemplateData } from "src/common/useTemplateData";
import { SEARCH_PATH } from "src/config";
import DirectorySearchBar from "src/components/directory/DirectorySearchBar";

interface DirectoryHeroProps {
  brand?: string;
  title: string;
}

const DirectoryHero = (props: DirectoryHeroProps) => {
  const { brand, title } = props;
  const { relativePrefixToRoot } = useTemplateData();

  return (
    <div className="DirectoryHero bg-brand-gray-100 py-8 md:py-20 px-4 md:px-0">
      <h1 className="mb-6 text-center">
        {brand && <div className="Heading Heading--sub mb-6">{brand}</div>}
        <div className="Heading Heading--head">{title}</div>
      </h1>
      <DirectorySearchBar
        placeholder="Search by city and state or ZIP code"
        searcherPath={relativePrefixToRoot + SEARCH_PATH}
      />
    </div>
  );
};

export default DirectoryHero;
