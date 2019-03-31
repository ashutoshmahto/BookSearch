import { makeServerRequest } from "../../utils";
import {
  INIT_BOOK_SEARCH,
  BOOK_SEARCH_SUCCESS,
  BOOK_SEARCH_ERROR
} from "./constants";

/* ACTION CREATORS */
export const searchBook = () => {
  return {
    type: INIT_BOOK_SEARCH
  };
};

export const getSearchResultSuccess = result => {
  return {
    type: BOOK_SEARCH_SUCCESS,
    result
  };
};

export const getSearchResultError = error => {
  return {
    type: BOOK_SEARCH_ERROR,
    error
  };
};

/* ASYNC ACTION DISPATCHERS */

/**
 * Method to dipatch actions after server response - thunk
 * @param {*} searchKey
 */
export const getSearchResults = searchKey => {
  return dispatch => {
    dispatch(searchBook());
    return getSearchResultFromApi(searchKey).then(
      result => dispatch(getSearchResultSuccess(result)),
      error => dispatch(getSearchResultError(error))
    );
  };
};

/**
 * Method to initiate server request
 * @param {*} searchKey
 */
export const getSearchResultFromApi = searchKey => {
  return makeServerRequest({
    url: "/search",
    params: {
      q: encodeURI(searchKey)
    }
  });
};
