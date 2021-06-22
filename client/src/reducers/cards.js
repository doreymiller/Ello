export default function cards(state = [], action) {
  switch (action.type) {
  case "BOARD_FETCHED": {
    let filteredState = state.filter(card => {
      return card.boardId != action.board._id;
    });

    action.board.lists.forEach(list => {
      filteredState = filteredState.concat(list.cards);
    });
    return filteredState;
  }

  case "CREATE_CARD_SUCCESS": {
    return state.concat(action.card);
  }

  case "FETCH_CARD_SUCCESS": {
    let filteredState = state.filter(card => {
      return card._id !== action.card._id;
    });
    return filteredState.concat(action.card);
  }

  case "EDIT_CARD_TITLE_SUCCESS", "EDIT_CARD_DESCRIPTION_SUCCESS", "ARCHIVE_CARD_SUCCESS": {
    let filteredState = state.filter(card => {
      return card._id !== action.card._id;
    });
    return filteredState.concat(action.card);
  }

  case "DELETE_CARD_SUCCESS": {
    let filteredState = state.filter(card => {
      return card._id !== action.respObj.cardId;
    });
    return filteredState;
  }

  default:
    return state;
  }
}
