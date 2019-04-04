import React from "react";
import { connect } from "react-redux";
import { getSearchResults } from "./actions";
import { getBookDetailsById } from "../BookDetails/actions";
import SearchComponent from "../../components/Search/Search";
import SearchResults from "../../components/Search/SearchResults";

export const Search = props => {
  return (
    <React.Fragment>
      <div className="row">
        <SearchComponent {...props} />
      </div>
      <div className="row">
        <SearchResults {...props} />
      </div>
    </React.Fragment>
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
    search: (query, page) => {
      dispatch(getSearchResults(query, page));
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
