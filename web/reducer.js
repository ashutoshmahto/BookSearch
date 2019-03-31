import { combineReducers } from "redux";
import bookSearchReducer from "./containers/Search/reducer";
import bookDetailsReducer from "./containers/BookDetails/reducer";

const rootReducer = combineReducers({
  bookSearchResult: bookSearchReducer,
  bookDetails: bookDetailsReducer
});

export default rootReducer;
