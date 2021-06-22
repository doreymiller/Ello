const Board = require("../models/board");
const HttpError = require("../models/httpError");
const List = require("../models/list");
const Card = require("../models/card");

const { validationResult } = require("express-validator");

const getCard = (req, res, next) => {
  const cardId = req.params.id;
  console.log("getCard:", cardId);

  Card.findById(cardId)
    .then(card => {
      return res.json({ card })
    })
    .catch(err => {
      next(new HttpError("Cant find card", 500))
    });

};

const createCard = (req, res, next) => {
  let card = req.body.card;
  let listId = req.list._id;
  let boardId = req.list.boardId;
  
  Card.create({ boardId, listId, ...card })
    .then((card) => {
      console.log("created card:", card);
      req.card = card;
      next();
    })
    .catch(err =>
      next(new HttpError("Creating card failed, please try again", 500))
    );
};

const sendCard = (req, res, next) => {
  const card = req.card;
  return res.json({card});
};

const createComment = async (req, res, next) => {
  const cardId = req.body.cardId;
  const comment = req.body.comment;
  console.log("createComment ", cardId);
  let card = await Card.findById(cardId);
  let newComments = card.comments.concat([comment]);
  Card.findByIdAndUpdate(cardId, { comments: newComments }, { new: true })
  .then((card) => {
    console.log("found card", card);
    req.card = card;
    next();
  })
}

const updateCard = (req, res, next) => {
  const cardId = req.params.id;
    Card.findByIdAndUpdate(cardId, req.body.card, { new: true })
      .then((card) => {
        req.card = card;
        next();
      })
      .catch(err =>
        next(new HttpError("Editing card failed, please try again", 500))
      );
};

const deleteCard = (req, res, next) => {
  const cardId = req.params.id;
    Card.findByIdAndDelete(cardId, function (err) {
      console.log("err:", err);
      if (err) {
        next(new HttpError("Editing card failed, please try again", 500));
      } else {
        console.log("about to send json")
        return res.json({cardId});
      }
    });
}



exports.getCard = getCard;
exports.createCard = createCard;
exports.sendCard = sendCard;
exports.createComment = createComment;
exports.updateCard = updateCard;
exports.deleteCard = deleteCard;