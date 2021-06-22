const Board = require("../models/board");
const HttpError = require("../models/httpError");
const List = require("../models/list");
const Card = require("../models/card");

const { validationResult } = require("express-validator");


const updateList = (req, res, next) => {
  // const errors = validationResult(req);
  const id = req.params.id;
  console.log("updateList:", req.body);
  // console.log("errors:", errors);
  // if (errors.isEmpty()) {
    let title = req.body.title;
    console.log("list:", title);
    List.findByIdAndUpdate(id, { title }, { new: true })
      .then((list) => {
        req.list = list;
        next();
      })
      .catch(err =>
        next(new HttpError("Creating list failed, please try again", 500))
      );
  // } else {
  //   return next(new HttpError("The input field is empty.", 404));
  // }
};

const createList = (req, res, next) => {
  console.log("createList");
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    let list = req.body.list;
    let boardId = req.body.boardId;
    List.create({ boardId, cards: [], ...list})
      .then((list) => {
        req.list = list;
        next();
      })
      .catch(err =>
        next(new HttpError("Creating list failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const sendList = (req, res, next) => {
  const list = req.list;
  return res.json({list});
};

const getList = (req, res, next) => {
  let listId = req.body.listId;
  List.findById(listId)
    .then((list) => {
      req.list = list;
      next();
    });
}


const addCard = async (req, res, next) => {
  // console.log("addCard to list");
  let listId = req.card.listId;
  let list = await List.findById(listId);
  // console.log("found list:", list);
  let cards = list.cards.concat(req.card._id);
  // console.log("setting cards:", cards);
  List.findByIdAndUpdate(listId, { cards }, { new: true })
    .then((list) => {
      // req.list = list;
      next();
    })
    .catch(err =>
      next(new HttpError("Creating list failed, please try again", 500))
    );
};

exports.createList = createList;
exports.sendList = sendList;
exports.updateList = updateList;
exports.addCard = addCard;
exports.getList = getList;

