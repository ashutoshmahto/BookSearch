import React from "react";
import { connect } from "react-redux";
import { getSearchResults } from "./actions";
import { getBookDetailsById } from "../BookDetails/actions";
import SearchComponent from "../../components/Search/Search";
import SearchResults from "../../components/Search/SearchResults";

export const Search = props => {
  return (
    <div>
      <SearchComponent {...props} />
      <SearchResults {...props} />
    </div>
  );
};

export const mapStateToProps = state => {
  const { bookSearchResult } = state;
  return {
    isSearching: bookSearchResult.isSearching,
    searchResult: bookSearchResult.data,
    error: bookSearchResult.error
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    search: query => {
      dispatch(getSearchResults(query));
    },
    getBookDetails: id => {
      dispatch(getBookDetailsById(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
