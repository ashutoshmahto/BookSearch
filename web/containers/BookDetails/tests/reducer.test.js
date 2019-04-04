import { expect } from "chai";
import reducer from "../reducer";
import {
  GET_BOOK_DETAILS,
  GET_BOOK_DETAILS_SUCCESS,
  GET_BOOK_DETAILS_ERROR
} from "../constants";

describe("#BookDetails reducer", () => {
  const result = {
    status: "SUCCESS",
    bookDetails: {}
  };
  const error = {
    status: "ERROR",
    message: "Something went wrong"
  };

  const bookDetailsFetchingState = {
    isFetching: true,
    data: null,
    error: null
  };

  it("should return the initial state", () => {
    const initialState = {
      isFetching: false,
      data: null,
      error: null
    };
    expect(reducer(undefined, {})).to.deep.equal(initialState);
  });

  it("should update state correctly for GET_BOOK_DETAILS action", () => {
    expect(reducer(undefined, { type: GET_BOOK_DETAILS })).to.deep.equal(
      bookDetailsFetchingState
    );
  });

  it("should update state correctly for GET_BOOK_DETAILS_SUCCESS action", () => {
    const bookDetailsSuccessState = {
      isFetching: false,
      data: result,
      error: null
    };
    expect(
      reducer(bookDetailsFetchingState, {
        type: GET_BOOK_DETAILS_SUCCESS,
        result
      })
    ).to.deep.equal(bookDetailsSuccessState);
  });

  it("should update state correctly GET_BOOK_DETAILS_ERROR action", () => {
    const bookDetailsErrorState = {
      isFetching: false,
      data: null,
      error: error
    };
    expect(
      reducer(bookDetailsFetchingState, { type: GET_BOOK_DETAILS_ERROR, error })
    ).to.deep.equal(bookDetailsErrorState);
  });
});
