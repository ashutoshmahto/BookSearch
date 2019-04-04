import React from "react";
import { connect } from "react-redux";
import pathOr from "lodash/fp/pathOr";
import { formatData } from "../../utils";
import Modal from "../../components/Modal/Modal";
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
      <Modal header="" isOpen={props.isFetching}>
        <BookDetailsComponent
          isFetching={props.isFetching}
          bookDetails={formattedBookDetails}
        />
      </Modal>
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
