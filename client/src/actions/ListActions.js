import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createListRequest() {
  return { type: types.CREATE_LIST_REQUEST };
}

export function createListSuccess(list) {
  return { type: types.CREATE_LIST_SUCCESS, list };
}

export function createCardSuccess(card) {
  return { type: types.CREATE_CARD_SUCCESS, card };
}

export function createNewCard(listId, cardTitle) {
  return function(dispatch) {
    const callback = (data) => {
      console.log("data from callback:", data);
      dispatch(createCardSuccess(data.card));
    }
    apiClient.createNewCard(listId, cardTitle, callback);
  };
}

export function createList(boardId, listName) {
  return function(dispatch) {
    dispatch(createListRequest());
    const callback = (data) => {
      console.log("data from callback:", data);
      dispatch(createListSuccess(data.list));
    }
    apiClient.createList(boardId, listName, callback);
  };
}

export function editList(listId, listName) {
  return function(dispatch) {
    const callback = (data) => {
      console.log("edit list callback:", data);
      dispatch(editListSuccess(data.list));
    };
    apiClient.editList(listId, listName, callback);
  }
}

export function editListSuccess(list) {
  return { type: types.EDIT_LIST_SUCCESS, list };
}
