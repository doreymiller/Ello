import axios from "axios";
import * as routes from "../constants/ApiRoutes";

function logError(errorResponse) {
  const response = errorResponse.response;

  if (response && response.data && response.data.error) {
    console.error(`HTTP Error: ${response.data.error}`);
  } else {
    console.error("Error: ", errorResponse);
  }
}

function unwrapData(response) {
  return response.data;
}

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Accept"] = "application/json";

const apiClient = {
  getBoards: function(callback) {
    return axios
      .get(routes.BOARDS_INDEX_URL)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createBoard: function(board, callback) {
    return axios
      .post(routes.CREATE_BOARD_URL, board)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  getBoard: function(boardId, callback) {
    return axios
      .get(routes.BOARDS_INDEX_URL + "/" + boardId)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createList: function(boardId, listName, callback) {
    const payload = {
      "boardId": boardId,
      "list": {
        "title": listName,
      }
    };

    return axios
      .post(routes.CREATE_LIST_URL, payload)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  editList: function(listId, listName, callback) {
    const payload = {
      "title": listName,
    };
    
    return axios
      .put(routes.CREATE_LIST_URL + "/" + listId, payload)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createNewCard: function(listId, cardTitle, callback) {
    const payload = {
      "listId": listId,
      "card": {
        "title": cardTitle
      }
    };

    return axios
      .post(routes.CREATE_CARD_URL, payload)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  fetchCard: function(cardId, callback) {
    return axios
    .get(routes.GET_CARD_URL + "/" + cardId)
    .then(unwrapData)
    .then(callback)
    .catch(logError);
  },
  editCardTitle: function(cardId, title, callback) {
    const payload = {
      "card": {
        "title": title
      }
    };

    return axios
    .put(routes.EDIT_CARD_URL + "/" + cardId, payload)
    .then(unwrapData)
    .then(callback)
    .catch(logError);
  },
  editCardDescription: function(cardId, description, callback) {
    const payload = {
      "card": {
        "description": description,
      }
    };

    return axios
    .put(routes.EDIT_CARD_URL + "/" + cardId, payload)
    .then(unwrapData)
    .then(callback)
    .catch(logError);
  },
  archiveCard: function(cardId, archiveState, callback) {
    const payload = {
      "card": {
        "archived": archiveState,
      }
    };

    return axios
    .put(routes.EDIT_CARD_URL + "/" + cardId, payload)
    .then(unwrapData)
    .then(callback)
    .catch(logError);
  },
  deleteCard: function(cardId, callback) {
    return axios
    .delete(routes.EDIT_CARD_URL + "/" + cardId)
    .then(unwrapData)
    .then(callback)
    .catch(logError);
  }
};

export default apiClient;