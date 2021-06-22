import React, { useState } from "react";
import { useEffect, useSelector, useDispatch } from "react-redux";
import List from "./List";
import apiClient from "../lib/ApiClient";
import { createList } from "../actions/ListActions";


const ListContainer = ({ boardId }) => {

  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const lists = useSelector(state => {
    return state.lists.filter(list => list.boardId === boardId);
  });

  console.log("ListContainer lists:", lists);
  
  const handleAddClick = e => {
    e.preventDefault();
    setEditMode(true);
  };

  const handleCloseClick = e => {
    e.preventDefault();
    e.stopPropagation();
    setEditMode(false);
  };

  const handleSaveClick = e => {
    e.preventDefault();
    e.stopPropagation();
    setEditMode(false);
    let listName = document.querySelector(".new-list input").value;

    if (listName !== "") {
      document.querySelector(".new-list input").value = "";
      dispatch(createList(boardId, listName));
    }
  }

  return (
    <>
      <div id="list-container" className="list-container">
        <div id="existing-lists" className="existing-lists">
          {lists.map(list => {
            return <List boardId={boardId} key={list._id} listId={list._id} />
          })}
        </div>
        <div id="new-list" className={editMode ? "new-list selected" : "new-list"} onClick={handleAddClick} >
          <span>Add a list...</span>
          <input type="text" placeholder="Add a list..."  />
          <div onClick={handleCloseClick}>
            <input type="submit" className="button" value="Save" onClick={handleSaveClick}/>
            <i className="x-icon icon" ></i>
          </div>
        </div>
      </div>
    </>
  )

}

export default ListContainer;
