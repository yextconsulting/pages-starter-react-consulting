import { DirectorySearchBar } from "src/components/Directory/DirectorySearchBar";

interface DirectoryHeroProps {
  subtitle?: string
  title: string
  relativePrefixToRoot: string
}

export function DirectoryHero(props: DirectoryHeroProps) {
  const { subtitle, title, relativePrefixToRoot } = props;
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
        searcherPath={relativePrefixToRoot + "search/search-page"}
      />
    </div>
  )
}
