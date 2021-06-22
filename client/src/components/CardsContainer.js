import React from "react";
import { useEffect, useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Card from "./Card";

const CardsContainer = ({ listId }) => {
  const cards = useSelector(state => {
    return state.cards.filter(card => card.listId === listId);
  });

 
  return (

    <div id="cards-container" data-id="list-1-cards">
      {cards.map(card => {
        return (
          <Card card={card} key={card._id} />
        )
      })}
    </div>
  )
}

export default CardsContainer;