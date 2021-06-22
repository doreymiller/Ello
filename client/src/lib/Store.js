import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import boards from "../reducers/boards";
import lists from "../reducers/lists";
import cards from "../reducers/cards";

const combined = combineReducers({
  boards,
  cards,
  lists
});

const store = createStore(combined, applyMiddleware(thunk));

export default store;
