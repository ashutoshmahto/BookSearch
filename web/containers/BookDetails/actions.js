import { makeServerRequest } from "../../utils";
import {
  GET_BOOK_DETAILS,
  GET_BOOK_DETAILS_SUCCESS,
  GET_BOOK_DETAILS_ERROR
} from "./constants";

/* ACTION CREATORS */
export const getBookDetails = () => {
  return {
    type: GET_BOOK_DETAILS
  };
};

export const getBookDetailsSuccess = result => {
  return {
    type: GET_BOOK_DETAILS_SUCCESS,
    result
  };
};

export const getBookDetailsError = error => {
  return {
    type: GET_BOOK_DETAILS_ERROR,
    error
  };
};

/* ASYNC ACTION DISPATCHERS */

/**
 * Method to dipatch actions after server response - thunk
 * @param {*} searchKey
 */
export const getBookDetailsById = bookId => {
  return dispatch => {
    dispatch(getBookDetails());
    return getBookDetailsFromApi(bookId).then(
      result => dispatch(getBookDetailsSuccess(result)),
      error => dispatch(getBookDetailsError(error))
    );
  };
};

/**
 * Method to initiate server request
 * @param {*} searchKey
 */
export const getBookDetailsFromApi = bookId => {
  return makeServerRequest({
    url: "/book",
    params: {
      id: bookId,
      format: "xml"
    }
  });
};
