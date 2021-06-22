import React from "react"
import { useEffect, useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Card = ({ card }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  const formattedDate = (date) => {
    date = new Date(date);
    return `${months[date.getMonth()]} ${date.getDate()}`
  }

  return (
    <Link to={`/cards/${card._id}`}>
      <div className="card-background">
        <div className="card ">
          <i className="edit-toggle edit-icon sm-icon"></i>
          <div className="cover-image"></div>
          <div className="card-info">
            <p>{card.title}</p>
          </div>
          <div className="card-icons">
            {card.dueDate ? 
              <i className="clock-icon sm-icon overdue ">{formattedDate(card.dueDate)}</i>
              : null
            }
            <i className="description-icon sm-icon"></i>
          </div>
        </div>
      </div>
      </Link>
  )
}

export default Card;