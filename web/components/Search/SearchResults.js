import React from "react";
import { formatData } from "../../utils";
import pathOr from "lodash/fp/pathOr";
import BookTile from "./BookTile";
import Pagination from "./Pagination";

const SearchResults = props => {
  const { isSearching, searchResult, getBookDetails } = props;
  if (isSearching) {
    return (
      <div>
        <div class="spinner-grow" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        Please wait while we are searching...
      </div>
    );
  }

  const rawSearchResult = pathOr(
    null,
    "data.GoodreadsResponse.search[0]",
    searchResult
  );

  const formattedSearchResult = rawSearchResult && formatData(rawSearchResult);
  const booksList = pathOr([], "results.work", formattedSearchResult);

  if (booksList.length) {
    return (
      <div>
        <h3>{`Showing ${formattedSearchResult["results-start"]} to ${
          formattedSearchResult["results-end"]
        } of ${formattedSearchResult["total-results"]} titles for "${
          formattedSearchResult["query"]
        }" (results in ${formattedSearchResult["query-time-seconds"]}s)`}</h3>
        <div>
          {booksList.map(item => {
            return <BookTile getBookDetails={getBookDetails} {...item} />;
          })}
        </div>
        <Pagination
          totalResults={formattedSearchResult["total-results"]}
          currentPage={formattedSearchResult["results-start"]}
        />
      </div>
    );
  }
  return null;
};

export default SearchResults;
