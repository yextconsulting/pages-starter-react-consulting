import { useCallback, useEffect, useState } from 'react';
import { useSearchActions, useSearchState } from '@yext/search-headless-react';
import { executeSearch } from '@yext/search-ui-react';

interface SearchButtonProps {
  className?: string,
  srText?: string,
}

// Modified from https://github.com/yext/search-ui-react/blob/main/src/components/ApplyFiltersButton.tsx

export default function SearchButton(props: SearchButtonProps): JSX.Element {
  const { className, srText = "Submit a Search." } = props;
  const searchActions = useSearchActions();
  const searchState = useSearchState(state => state);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!searchState.filters.static?.length ? true : false);
  }, [searchState]);

  const handleClick = useCallback(() => {
    searchActions.setOffset(0);
    executeSearch(searchActions);
  }, [searchActions]);

  return (
    <button
      className={ className }
      disabled={ disabled }
      onClick={ handleClick }
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill={disabled ? "#767676" : "#0f70f0"} d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z" />
      </svg>
      <span className="sr-only">{ srText }</span>
    </button>
  );
}
