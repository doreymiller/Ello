import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCard, editCardTitle, editCardDescription, archiveCard, deleteCard } from "../actions/CardActions";
import { Link } from "react-router-dom";

const CardModal = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [cardTitle, setCardTitle] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [descriptionEditMode, setDescriptionEditMode] = useState(false);

  let cards = useSelector(state => state.cards);
  let card = cards.find((card) => card._id === id);

  let lists = useSelector(state => state.lists);
  let list, boardId;

  if (card) {
    list = lists.find(list => list._id === card.listId);
    boardId = card.boardId;
  }
  
  useEffect(() => {
    dispatch(fetchCard(id));
  }, [dispatch, id]);

  const handleEditTitle = (e) => {
    e.preventDefault();
    setCardTitle(e.target.value);
  };

  const handleTitleChange = (e) => {
    e.preventDefault();
    if (cardTitle !== "") {
      dispatch(editCardTitle(id, cardTitle));
    }
  }

  const handleCardDelete = (e) => {
    // e.preventDefault();
    console.log("clicked card delete button");
    dispatch(deleteCard(id));

  }

  const labelDiv = (color) => {
    return (
      <div className="member-container">
        <div className={color + " label colorblindable"}></div>
      </div>
    )
  };

  const handleCloseDescriptionEditClick = (e) => {
    e.preventDefault();
    setDescriptionEditMode(false);
  }

  const handleEditDescription = (e) => {
    e.preventDefault();
    setCardDescription(e.target.value);
  }

  const handleCardArchive = (e, archiveState) => {
    e.preventDefault();
    dispatch(archiveCard(id, archiveState));
  }

  const handleSaveDescription = (e) => {
    e.preventDefault();
    dispatch(editCardDescription(id, cardDescription));
    setDescriptionEditMode(false);
    setCardDescription("");
  }

  const handleDescriptionEditClick = (e) => {
    setDescriptionEditMode(true);
  }

  const handleDiscardEdits = (e) => {
    setCardDescription("");
  }

  const dueDateSection = (date) => {
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
    const isPastDue = (dueDate) => {
      let currentDate = new Date().getDate();
      let due = new Date(dueDate);
      return currentDate < due;
    }

    const convertHours = (hour) => {
      if (hour === 0) return 12;
      return hour % 12;
    }

    const getAMorPM = (hour) => {
      return hour < 12 ? "AM" : "PM";
    }

    const convertMinutes = (minutes) => {
      if (minutes < 10) minutes = "0" + String(minutes);
      return String(minutes);
    }

    const formattedDate = (date) => {
      date = new Date(date);
      return `${months[date.getMonth()]} ${date.getDate()} at ${convertHours(date.getHours())}:${convertMinutes(date.getMinutes())} ${getAMorPM(date.getHours())}`
    }

    return (
      <li className="due-date-section">
          <h3>Due Date</h3>
          <div id="dueDateDisplay" className="overdue completed">
            <input
              id="dueDateCheckbox"
              type="checkbox"
              className="checkbox"
              checked=""
            />
            {formattedDate(date)} {isPastDue(date) ? <span>"(past due)"</span> : null }
          </div>
        </li>
    )
  }

  if (!card || !list ) return null;

  return (
    <div id="modal-container">
      <div className="screen"></div>
      <div id="modal">
      <Link to={`/boards/${card.boardId}`}> 
        <i className="x-icon icon close-modal" ></i>
      </Link>
      {card.archived ?
      <div className="archived-banner">
          <i className="file-icon icon"></i>This card is archived.
      </div>
      : null }
        <header>
          <i className="card-icon icon .close-modal"></i>
          <textarea className="list-title" style={{ height: "45px" }} onChange={handleEditTitle} onBlur={handleTitleChange}>
          {card.title}
          </textarea>
          <p>
            in list <a className="link">{list.title}</a>
            <i className="sub-icon sm-icon"></i>
          </p>
        </header>
        <section className="modal-main">
          <ul className="modal-outer-list">
            <li className="details-section">
              <ul className="modal-details-list">
                <li className="labels-section">
                  <h3>Labels</h3>
                  {card.labels.map(label => labelDiv(label))}
                </li>
                {card.dueDate ? dueDateSection(card.dueDate) : null}
              </ul>
              <form className="description">
                <p>Description</p>
                <span id="description-edit" className="link" onClick={handleDescriptionEditClick}>
                  Edit
                </span>
                {descriptionEditMode ?
                <div>
                <textarea className="textarea-toggle" rows="1" autoFocus onChange={handleEditDescription}>
                {cardDescription === "" ? card.description : cardDescription}
                </textarea>
                <div>
                  <div className="button" value="Save" onClick={handleSaveDescription}>
                    Save
                  </div>
                  <i className="x-icon icon" onClick={handleCloseDescriptionEditClick}></i>
                </div></div> :
                <p className="textarea-overlay">{card.description}</p>
              }
                <p id="description-edit-options" className={cardDescription !== "" && !descriptionEditMode ? "" : "hidden"}>
                  You have unsaved edits on this field.{" "}
                  <span className="link" onClick={handleDescriptionEditClick}>View edits</span> -{" "}
                  <span className="link" onClick={handleDiscardEdits}>Discard</span>
                </p>
              </form>
            </li>
            <li className="comment-section">
              <h2 className="comment-icon icon">Add Comment</h2>
              <div>
                <div className="member-container">
                  <div className="card-member">TP</div>
                </div>
                <div className="comment">
                  <label>
                    <textarea
                      required=""
                      rows="1"
                      placeholder="Write a comment..."
                    ></textarea>
                    <div>
                      <a className="light-button card-icon sm-icon"></a>
                      <a className="light-button smiley-icon sm-icon"></a>
                      <a className="light-button email-icon sm-icon"></a>
                      <a className="light-button attachment-icon sm-icon"></a>
                    </div>
                    <div>
                      <input
                        type="submit"
                        className="button not-implemented"
                        value="Save"
                      />
                    </div>
                  </label>
                </div>
              </div>
            </li>
            <li className="activity-section">
              <h2 className="activity-icon icon">Activity</h2>
              <ul className="horiz-list">
                <li className="not-implemented">Show Details</li>
              </ul>
              <ul className="modal-activity-list">
                <li>
                  <div className="member-container">
                    <div className="card-member">TP</div>
                  </div>
                  <h3>Taylor Peat</h3>
                  <div className="comment static-comment">
                    <span>The activities are not functional.</span>
                  </div>
                  <small>
                    22 minutes ago - <span className="link">Edit</span> -{" "}
                    <span className="link">Delete</span>
                  </small>
                  <div className="comment">
                    <label>
                      <textarea required="" rows="1">
                        The activities have not been implemented yet.
                      </textarea>
                      <div>
                        <a className="light-button card-icon sm-icon"></a>
                        <a className="light-button smiley-icon sm-icon"></a>
                        <a className="light-button email-icon sm-icon"></a>
                      </div>
                      <div>
                        <p>You haven&apos;t typed anything!</p>
                        <input
                          type="submit"
                          className="button not-implemented"
                          value="Save"
                        />
                        <i className="x-icon icon"></i>
                      </div>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="member-container">
                    <div className="card-member small-size">VR</div>
                  </div>
                  <p>
                    <span className="member-name">Victor Reyes</span> changed the
                    background of this board <small>yesterday at 4:53 PM</small>
                  </p>
                </li>
                <li className="activity-comment">
                  <div className="member-container">
                    <div className="card-member">VR</div>
                  </div>
                  <h3>Victor Reyes</h3>
                  <div className="comment static-comment">
                    <span>Example of a comment.</span>
                  </div>
                  <small>
                    22 minutes ago - <span className="link">Edit</span> -{" "}
                    <span className="link">Delete</span>
                  </small>
                  <div className="comment">
                    <label>
                      <textarea required="" rows="1">
                        Example of a comment.
                      </textarea>
                      <div>
                        <a className="light-button card-icon sm-icon"></a>
                        <a className="light-button smiley-icon sm-icon"></a>
                        <a className="light-button email-icon sm-icon"></a>
                      </div>
                      <div>
                        <p>You haven&apos;t typed anything!</p>
                        <input
                          type="submit"
                          className="button not-implemented"
                          value="Save"
                        />
                        <i className="x-icon icon"></i>
                      </div>
                    </label>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </section>
        <aside className="modal-buttons">
          <h2>Add</h2>
          <ul>
            <li className="member-button">
              <i className="person-icon sm-icon"></i>Members
            </li>
            <li className="label-button">
              <i className="label-icon sm-icon"></i>Labels
            </li>
            <li className="checklist-button">
              <i className="checklist-icon sm-icon"></i>Checklist
            </li>
            <li className="date-button not-implemented">
              <i className="clock-icon sm-icon"></i>Due Date
            </li>
            <li className="attachment-button not-implemented">
              <i className="attachment-icon sm-icon"></i>Attachment
            </li>
          </ul>
          <h2>Actions</h2>
          <ul>
            <li className="move-button">
              <i className="forward-icon sm-icon"></i>Move
            </li>
            <li className="copy-button">
              <i className="card-icon sm-icon"></i>Copy
            </li>
            <li className="subscribe-button">
              <i className="sub-icon sm-icon"></i>Subscribe
              <i className="check-icon sm-icon"></i>
            </li>
            <hr />
            {card.archived ? <>
              <li className="unarchive-button" onClick={(e) => {handleCardArchive(e, false)} }>
                <i className="send-icon sm-icon"></i>Send to board
              </li>
            <Link to={`/boards/${card.boardId}`}> 
              <li className="red-button" onClick={handleCardDelete}>
                <i className="minus-icon sm-icon"></i>Delete
              </li>
            </Link>
            </>
            :
            <li className="archive-button" onClick={ (e) => {handleCardArchive(e, true)} }>
              <i className="file-icon sm-icon "></i>Archive
            </li>
          }
          </ul>
          <ul className="light-list">
            <li className="not-implemented">Share and more...</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default CardModal;
