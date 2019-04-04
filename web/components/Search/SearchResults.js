import React from "react";
import { formatData } from "../../utils";
import pathOr from "lodash/fp/pathOr";
import BookTile from "./BookTile";
import Pagination from "./Pagination";

const SearchResults = props => {
  const { isSearching, searchResult, getBookDetails, search } = props;
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
  let booksList = pathOr(null, "results.work", formattedSearchResult);
  /* When there is one result, result be an object */
  if (!Array.isArray(booksList)) {
    booksList = booksList ? [booksList] : [];
  }
  if (booksList.length) {
    const currentPageNum =
      Math.floor(Number(formattedSearchResult["results-start"]) / 20) + 1;

    const resultStart = formattedSearchResult["results-start"];
    const resultEnd = formattedSearchResult["results-end"];
    const totalResults = formattedSearchResult["total-results"];
    const query = formattedSearchResult["query"];
    const queryTime = formattedSearchResult["query-time-seconds"];
    return (
      <div className="search-results">
        <h3>
          {`Showing ${resultStart} to ${resultEnd} of ${totalResults} titles for "${query}" (results in ${queryTime}s)`}
        </h3>
        <div className="book-tile-wrapper">
          {booksList.map(item => {
            return <BookTile getBookDetails={getBookDetails} {...item} />;
          })}
        </div>

        <Pagination
          totalResults={Number(totalResults)}
          pageStart={Number(resultStart)}
          pageEnd={Number(resultEnd)}
          currentPage={currentPageNum}
          search={search}
          searchQuery={query}
        />
      </div>
    );
  }
  return null;
};

export default SearchResults;
