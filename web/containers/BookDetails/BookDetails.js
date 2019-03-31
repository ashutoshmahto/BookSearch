import React from "react";
import { connect } from "react-redux";
import pathOr from "lodash/fp/pathOr";
import { formatData } from "../../utils";
import BookDetailsComponent from "../../components/BookDetails/BookDetails";

const BookDetails = props => {
  const rawBookDetails = pathOr(
    null,
    "data.GoodreadsResponse.book[0]",
    props.bookDetails
  );
  const formattedBookDetails = rawBookDetails && formatData(rawBookDetails);

  return (
    formattedBookDetails && (
      <BookDetailsComponent
        isFetching={props.isFetching}
        bookDetails={formattedBookDetails}
      />
    )
  );
};

export const mapStateToProps = (state, ownProps) => {
  const { bookDetails } = state;
  return {
    bookDetails: bookDetails.data,
    isFetching: bookDetails.isFetching
  };
};
export default connect(mapStateToProps)(BookDetails);
