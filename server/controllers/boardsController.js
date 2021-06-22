const Board = require("../models/board");
const HttpError = require("../models/httpError");
const List = require("../models/list");
const Card = require("../models/card");

const { validationResult } = require("express-validator");

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt")
    .then(boards => {
      res.json({
        boards,
      })
    })
};

const getBoard = (req, res, next) => {
  const boardId = req.params.id;

  Board.findById(boardId)
    .populate({
      path: 'lists',
      populate: {path: 'cards'},
    })
    .then(board => {
      console.log("board:", board);
      res.json({
        board,
      });
    })
    .catch(e => {
      console.log(e);
      console.log("we had an error");
    })
}

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.create(req.body)
      .then((board) => {
        Board.find({ _id: board._id }, "title _id createdAt updatedAt").then(board => res.json({ board }))
      })
      .catch(err =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const addList = (req, res, next) => {
  const list = req.list;
  const boardId = list.boardId;
  Board.findByIdAndUpdate(boardId, {
    $addToSet: { lists: list._id } // adds list to the lists array in board
  }).then(() => {
    next();
  });
};


exports.getBoards = getBoards;
exports.createBoard = createBoard;
exports.getBoard = getBoard;
exports.addList = addList;



