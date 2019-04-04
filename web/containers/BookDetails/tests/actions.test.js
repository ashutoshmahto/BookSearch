import sinon from "sinon";
import { expect } from "chai";
import configureMockStore from "redux-mock-store";
import thunkMiddelware from "redux-thunk";
import {
  GET_BOOK_DETAILS,
  GET_BOOK_DETAILS_SUCCESS,
  GET_BOOK_DETAILS_ERROR
} from "../constants";
import {
  getBookDetails,
  getBookDetailsSuccess,
  getBookDetailsError,
  getBookDetailsFromApi,
  getBookDetailsById
} from "../actions";

import * as utils from "../../../utils";

const middlewares = [thunkMiddelware];
const mockStore = configureMockStore(middlewares);

describe("#BookDetails actions", () => {
  it("getBookDetails: should create an action to get book details", () => {
    const action = {
      type: GET_BOOK_DETAILS
    };
    expect(getBookDetails()).to.deep.equal(action);
  });

  it("getBookDetailsSuccess: should create an action when book details api gets success", () => {
    const result = {
      status: "SUCCESS",
      bookDetails: {}
    };
    const action = {
      type: GET_BOOK_DETAILS_SUCCESS,
      result
    };
    expect(getBookDetailsSuccess(result)).to.deep.equal(action);
  });

  it("getBookDetailsError: should create an action when book details api fails", () => {
    const error = {
      status: "ERROR",
      message: "Something went wrong"
    };
    const action = {
      type: GET_BOOK_DETAILS_ERROR,
      error
    };
    expect(getBookDetailsError(error)).to.deep.equal(action);
  });
});

describe("#BookDetails async actions", () => {
  const result = {
    status: "SUCCESS",
    bookDetails: {}
  };

  const error = {
    status: "ERROR",
    message: "Something went wrong"
  };

  it("getBookDetailsFromApi: should make server request and return results", () => {
    const makeServerRequest = sinon
      .stub(utils, "makeServerRequest")
      .returns(result);
    expect(getBookDetailsFromApi()).to.deep.equal(result);
    makeServerRequest.restore();
  });

  it("getBookDetailsById: should dispatch BOOK_SEARCH_SUCCESS action when API gets success", () => {
    const store = mockStore({ bookDetails: {} });
    /* Mock API Request */
    const makeServerRequest = sinon.stub(utils, "makeServerRequest").returns(
      new Promise((resolve, reject) => {
        resolve(result);
      })
    );

    const expectedActions = [
      { type: GET_BOOK_DETAILS },
      { type: GET_BOOK_DETAILS_SUCCESS, result }
    ];

    store.dispatch(getBookDetailsById("12323")).then(() => {
      // return of async actions
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
    makeServerRequest.restore();
  });

  it("getBookDetailsById: should dispatch BOOK_SEARCH_ERROR action when API fails", () => {
    const store = mockStore({ bookDetails: {} });
    /* Mock API Request */
    const makeServerRequest = sinon.stub(utils, "makeServerRequest").returns(
      new Promise((resolve, reject) => {
        reject(error);
      })
    );

    const expectedActions = [
      { type: GET_BOOK_DETAILS },
      { type: GET_BOOK_DETAILS_ERROR, error }
    ];

    store.dispatch(getBookDetailsById("12323")).then(() => {
      // return of async actions
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
    makeServerRequest.restore();
  });
});
