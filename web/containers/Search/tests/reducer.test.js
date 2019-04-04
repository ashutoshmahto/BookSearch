import { expect } from "chai";
import reducer from "../reducer";
import {
  INIT_BOOK_SEARCH,
  BOOK_SEARCH_SUCCESS,
  BOOK_SEARCH_ERROR
} from "../constants";

describe("#Search reducer", () => {
  const result = {
    status: "SUCCESS",
    books: []
  };
  const error = {
    status: "ERROR",
    message: "Something went wrong"
  };

  const searchingState = {
    isSearching: true,
    data: null,
    error: null
  };

  it("should return the initial state", () => {
    const initialState = {
      isSearching: false,
      data: null,
      error: null
    };
    expect(reducer(undefined, {})).to.deep.equal(initialState);
  });

  it("should update state correctly for INIT_BOOK_SEARCH action", () => {
    expect(reducer(undefined, { type: INIT_BOOK_SEARCH })).to.deep.equal(
      searchingState
    );
  });

  it("should update state correctly for BOOK_SEARCH_SUCCESS action", () => {
    const searchSuccessState = {
      isSearching: false,
      data: result,
      error: null
    };
    expect(
      reducer(searchingState, { type: BOOK_SEARCH_SUCCESS, result })
    ).to.deep.equal(searchSuccessState);
  });

  it("should update state correctly BOOK_SEARCH_ERROR action", () => {
    const searchErrorState = {
      isSearching: false,
      data: null,
      error: error
    };
    expect(
      reducer(searchingState, { type: BOOK_SEARCH_ERROR, error })
    ).to.deep.equal(searchErrorState);
  });
});
