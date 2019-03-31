import {
  GET_BOOK_DETAILS,
  GET_BOOK_DETAILS_SUCCESS,
  GET_BOOK_DETAILS_ERROR
} from "./constants";

const initialState = {
  data: null,
  isFetching: false,
  error: null
};

const reducer = (state = initialState, { type, result, error }) => {
  switch (type) {
    case GET_BOOK_DETAILS:
      return { ...state, isFetching: true };
    case GET_BOOK_DETAILS_SUCCESS:
      return { ...state, isFetching: false, data: result, error: null };
    case GET_BOOK_DETAILS_ERROR:
      return { ...state, isFetching: false, data: null, error };
    default:
      return state;
  }
};

export default reducer;
