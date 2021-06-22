import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import apiClient from "../lib/ApiClient";
import ListContainer from "./ListContainer";
import { fetchBoard } from "../actions/BoardActions";

const Board = (props) => {
  const dispatch = useDispatch();
  const { url } = props.match;
  let { id } = useParams();
  let boardId;
  let cards = useSelector(state => state.cards);

  if (url.includes("boards")) {
    boardId = id;
  } else {
    let card = cards.find(c => c._id === id);
    if (card) {
      boardId = card.boardId;
    }
  }
  const boards = useSelector(state => state.boards);
  const board = boards.find(singleBoard => {
    return singleBoard._id === boardId;
  });
  

  useEffect(() => {  
    if (boardId) {
      dispatch(fetchBoard(boardId));
    }
  }, [dispatch, boardId]);

  
  if (board) {
    return (
      <>
        <header>
          <ul>
            <li id="title">{board.title}</li>
            <li className="star-icon icon"></li>
            <li className="private private-icon icon">Private</li>
          </ul>
          <div className="menu">
            <i className="more-icon sm-icon"></i>Show Menu
          </div>
          <div className="subscribed">
            <i className="sub-icon sm-icon"></i>Subscribed
          </div>
        </header>
        <main>
          <ListContainer boardId={boardId}/>
        </main>
        <div id="modal-container"></div>
        <div id="dropdown-container"></div>
      </>
    );
  } else {
    return null;
  }

};

export default Board;
