export default function lists(state = [], action) {
  switch (action.type) {
  case "BOARD_FETCHED": {
    let filteredState = state.filter(list => {
      return list.board._id != action.board._id;
    })

    const listsWithoutCards = action.board.lists.map(list => {
      const { cards, ...listWithoutCards } = list;
      return listWithoutCards;
    });

    filteredState = filteredState.concat(listsWithoutCards);
    console.log("list reducer board fetched", filteredState);
    return filteredState;
  }
  case "CREATE_LIST_SUCCESS": {
    return state.concat(action.list);
  }

  case "EDIT_LIST_SUCCESS": {
    console.log("edit list!");
    let newState = state.map(list => {
      if (list._id === action.list._id) {
        return action.list;
      } else {
        return list;
      }
    });
    return newState;
  }


  default:
    return state;
  }
}
