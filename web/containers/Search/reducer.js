import {
  INIT_BOOK_SEARCH,
  BOOK_SEARCH_SUCCESS,
  BOOK_SEARCH_ERROR
} from "./constants";

const initialState = {
  isSearching: false,
  data: null,
  error: null
};

const reducer = (state = initialState, { type, result, error }) => {
  switch (type) {
    case INIT_BOOK_SEARCH:
      return { ...state, isSearching: true };
    case BOOK_SEARCH_SUCCESS:
      return {
        ...state,
        isSearching: false,
        data: result,
        error: null
      };
    case BOOK_SEARCH_ERROR:
      return {
        ...state,
        isSearching: false,
        data: null,
        error: error
      };
    default:
      return state;
  }
};

export default reducer;
