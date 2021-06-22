import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function fetchCardSuccess(card) {
    return { type: types.FETCH_CARD_SUCCESS, card };
}

export function fetchCard(cardId) {
    return function(dispatch) {
        const callback = (data) => {
            dispatch(fetchCardSuccess(data.card));
        }
        apiClient.fetchCard(cardId, callback);
    };
}

export function editCardTitleSuccess(card) {
    console.log("editCardTitleSuccess");
    return { type: types.EDIT_CARD_TITLE_SUCCESS, card };
}

export function editCardTitle(cardId, newTitle) {
    return function(dispatch) {
        const callback = (data) => {
            dispatch(editCardTitleSuccess(data.card));
        }
        apiClient.editCardTitle(cardId, newTitle, callback);
    }
}

export function editCardDescriptionSuccess(card) {
    return { type: types.EDIT_CARD_DESCRIPTION_SUCCESS, card };
}

export function editCardDescription(cardId, newDescription) {
    return function(dispatch) {
        const callback = (data) => {
            dispatch(editCardDescriptionSuccess(data.card));
        }
        apiClient.editCardDescription(cardId, newDescription, callback)
    }
}

export function archiveCardSuccess(card) {
    return { type: types.ARCHIVE_CARD_SUCCESS, card}
}

export function deleteCardSuccess(respObj) {
    console.log("deleteCardSuccess", respObj);
    return { type: types.DELETE_CARD_SUCCESS, respObj}
}

export function archiveCard(cardId, archiveState) {
    return function(dispatch) {
        const callback = (data) => {
            dispatch(archiveCardSuccess(data.card));
        }
        apiClient.archiveCard(cardId, archiveState, callback);
    }
}

export function deleteCard(cardId) {
    return function(dispatch) {
        const callback = (data) => {
            console.log("callback delete card", data);
            dispatch(deleteCardSuccess(data));
        }
        apiClient.deleteCard(cardId, callback);
    }
}