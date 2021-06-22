export default function boards(state = [], action) {
  switch (action.type) {
  case "FETCH_BOARDS_SUCCESS": {
    return action.boards;
  }
  case "CREATE_BOARD_SUCCESS": {
    const newBoard = action.board;
    return state.concat(newBoard);
  }
  case "BOARD_FETCHED": {
    let filteredState = state.filter(board => {
      return board._id != action.board._id;
    })

    const { lists, ...boardWithoutLists } = action.board;
    filteredState = filteredState.concat(boardWithoutLists);
    return filteredState;
  }
  default:
    return state;
  }
}
