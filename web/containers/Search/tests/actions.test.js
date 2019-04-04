import sinon from "sinon";
import { expect } from "chai";
import configureMockStore from "redux-mock-store";
import thunkMiddelware from "redux-thunk";
import {
  INIT_BOOK_SEARCH,
  BOOK_SEARCH_SUCCESS,
  BOOK_SEARCH_ERROR
} from "../constants";
import {
  searchBook,
  getSearchResultSuccess,
  getSearchResultError,
  getSearchResultFromApi,
  getSearchResults
} from "../actions";

import * as utils from "../../../utils";

const middlewares = [thunkMiddelware];
const mockStore = configureMockStore(middlewares);

describe("#Search actions", () => {
  it("searchBook: should create an action to initialize search", () => {
    const action = {
      type: INIT_BOOK_SEARCH
    };
    expect(searchBook()).to.deep.equal(action);
  });

  it("getSearchResultSuccess: should create an action when search api gets success", () => {
    const result = {
      status: "SUCCESS",
      books: []
    };
    const action = {
      type: BOOK_SEARCH_SUCCESS,
      result
    };
    expect(getSearchResultSuccess(result)).to.deep.equal(action);
  });

  it("getSearchResultError: should create an action when search api fails", () => {
    const error = {
      status: "ERROR",
      message: "Something went wrong"
    };
    const action = {
      type: BOOK_SEARCH_ERROR,
      error
    };
    expect(getSearchResultError(error)).to.deep.equal(action);
  });
});

describe("#Search async actions", () => {
  const result = {
    status: "SUCCESS",
    books: []
  };

  const error = {
    status: "ERROR",
    message: "Something went wrong"
  };

  it("getSearchResultFromApi: should make server request and return results", () => {
    const makeServerRequest = sinon
      .stub(utils, "makeServerRequest")
      .returns(result);
    expect(getSearchResultFromApi()).to.deep.equal(result);
    makeServerRequest.restore();
  });

  it("getSearchResults: should dispatch BOOK_SEARCH_SUCCESS action when API gets success", () => {
    const store = mockStore({ bookSearchResult: {} });
    /* Mock API Request */
    const makeServerRequest = sinon.stub(utils, "makeServerRequest").returns(
      new Promise((resolve, reject) => {
        resolve(result);
      })
    );

    const expectedActions = [
      { type: INIT_BOOK_SEARCH },
      { type: BOOK_SEARCH_SUCCESS, result }
    ];

    store.dispatch(getSearchResults("java")).then(() => {
      // return of async actions
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
    makeServerRequest.restore();
  });

  it("getSearchResults: should dispatch BOOK_SEARCH_ERROR action when API fails", () => {
    const store = mockStore({ bookSearchResult: {} });
    /* Mock API Request */
    const makeServerRequest = sinon.stub(utils, "makeServerRequest").returns(
      new Promise((resolve, reject) => {
        reject(error);
      })
    );

    const expectedActions = [
      { type: INIT_BOOK_SEARCH },
      { type: BOOK_SEARCH_ERROR, error }
    ];

    store.dispatch(getSearchResults("java")).then(() => {
      // return of async actions
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
    makeServerRequest.restore();
  });
});
