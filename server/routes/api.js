const express = require ('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardsController = require("../controllers/cardsController");
const { validateBoard, validateList } = require("../validators/validators");


router.get('/boards',boardsController.getBoards );

router.post('/boards', validateBoard, boardsController.createBoard );

router.get('/boards/:id', boardsController.getBoard );

router.post('/lists', validateList, listsController.createList, boardsController.addList, listsController.sendList);

router.put('/lists/:id', validateList, listsController.updateList, listsController.sendList);

router.get('/cards/:id', cardsController.getCard );

router.post('/cards', listsController.getList, cardsController.createCard, listsController.addCard, cardsController.sendCard);

router.post('/comments', cardsController.createComment, cardsController.sendCard);

router.put('/cards/:id', cardsController.updateCard, cardsController.sendCard);

router.delete('/cards/:id', cardsController.deleteCard);

module.exports = router;
