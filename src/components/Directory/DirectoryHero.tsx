import { DirectorySearchBar } from "src/components/Directory/DirectorySearchBar";
import { useTemplateData } from "src/common/useTemplateData";
import { SEARCH_PATH } from "src/common/consts";

interface DirectoryHeroProps {
  subtitle?: string
  title: string
}

export function DirectoryHero(props: DirectoryHeroProps) {
  const { subtitle, title } = props;
  const { relativePrefixToRoot } = useTemplateData();

  return (
    <div className="DirectoryHero bg-brand-gray-100 py-8 md:py-20 px-4 md:px-0">
      <h1 className="mb-6 text-center">
        {subtitle && (
          <span className="mb-6 text-2xl block">
            {subtitle}
          </span>
        )}
        {' '}
        <span className="text-4xl block">
          {title}
        </span>
      </h1>
      <DirectorySearchBar
        placeholder="Search by city and state or ZIP code"
        labelText="Search by city and state or ZIP code"
        queryParameter="q"
        inputId="q"
        formId="directory-search"
        // TODO: Pull searcher path from directory hero
        searcherPath={relativePrefixToRoot + SEARCH_PATH}
      />
    </div>
  )
}
