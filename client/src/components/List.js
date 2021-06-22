import React, { useState } from "react";
import { useEffect, useSelector, useDispatch } from "react-redux";
import CardsContainer from "./CardsContainer";
import { editList, createNewCard } from "../actions/ListActions";

const List = ( { boardId, listId }) => {
  const lists = useSelector(state => state.lists);
  const currentList = lists.find(list => list._id === listId);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [newTitle, setNewTitle] = useState(currentList.title);
  const [newCardTitle, setNewCardTitle] = useState("");

  const handleEditClick = (e) => {
    console.log("handleEditClick");

    e.preventDefault();
    e.stopPropagation();
    
    setEditMode(true);
  };

  const handleNewTitle = (e) => {
    e.preventDefault();
    setNewTitle(e.target.value);
  };

  const handleReturn = (e) => {
    console.log("handleReturn");

    e.preventDefault();
    
    if (e.keyCode === 13) {
      setEditMode(false);
      dispatch(editList(listId, newTitle));
    }
  };

  const handleAddCardClick = e => {
    e.preventDefault();
    setNewCardTitle("");
    setAddMode(true);
  };

  const handleCloseClick = e => {
    console.log("handleCloseClick");
    e.preventDefault();
    e.stopPropagation();
    setNewCardTitle("");
    setAddMode(false);
  };

  const handleNewCard = e => {
    console.log("handleNewCard");
    e.preventDefault();
    setAddMode(false);
    dispatch(createNewCard(listId, newCardTitle));
    setNewCardTitle("");
  }

  const handleCardTitleChange = e => {
    e.preventDefault();
    setNewCardTitle(e.currentTarget.value);
  }

  return (
    <div className={addMode? "list-wrapper add-dropdown-active" : "list-wrapper"}>
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            {editMode ? 
              <input type="text" className="list-title" value={newTitle} onChange={handleNewTitle} autoFocus onKeyUp={handleReturn}/>
              :
              <p onClick={handleEditClick} className="list-title">{currentList.title}</p>
            }
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <CardsContainer listId={listId}/>
          <div className={addMode ? "add-dropdown add-bottom active-card" : "add-dropdown add-bottom"}>
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card" value={newCardTitle} onChange={handleCardTitleChange}></textarea>
              <div className="members"></div>
            </div>
            <a className="button" onClick={handleNewCard}>Add</a>
            <i className="x-icon icon" onClick={handleCloseClick}></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div className="add-card-toggle" data-position="bottom" onClick={handleAddCardClick}>
            Add a card...
          </div>
        </div>
      </div>
    </div>
  )
}

export default List;
