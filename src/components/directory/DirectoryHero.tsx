import { useTemplateData } from "src/common/useTemplateData";
import DirectorySearchBar from "src/components/directory/DirectorySearchBar";
import { FALLBACK_SEARCH_PATH } from "src/config";
import { DirectoryProfile } from "src/types/entities";
import ErrorBoundaryWithAnalytics from "../common/ErrorBoundaryWithAnalytics";

// This template unpacks/transforms data from the API response and then calls the Layout template
const DirectoryHero = (props: {}) => {
  const templateData = useTemplateData();
  const profile = templateData.document as DirectoryProfile<never>;
  const searchPath =
    templateData.relativePrefixToRoot +
    (profile._site.c_searchPage?.slug || FALLBACK_SEARCH_PATH);

  return (
    <DirectoryHeroLayout
      line1={profile._site.c_brand}
      line2={profile.name}
      searchPath={searchPath}
    />
  );
};

interface DirectoryHeroProps {
  line1?: string;
  line2?: string;
  searchPath?: string;
}

// This template renders the data into HTML
const DirectoryHeroLayout = (props: DirectoryHeroProps) => {
  const { line1, line2 } = props;

  return (
    <ErrorBoundaryWithAnalytics name="directory_hero">
      <div className="DirectoryHero bg-brand-gray-100 py-8 md:py-20 px-4 md:px-0">
        <h1 className="mb-6 text-center">
          {line1 && <div className="Heading Heading--sub mb-6">{line1}</div>}
          {line2 && <div className="Heading Heading--head">{line2}</div>}
        </h1>
        {props.searchPath && (
          <DirectorySearchBar
            placeholder="Search by city and state or ZIP code"
            searcherPath={props.searchPath}
          />
        )}
      </div>
    </ErrorBoundaryWithAnalytics>
  );
};

export default DirectoryHero;
