const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Card title is required']
  },
  labels: [
    {
      type: String
    }
  ],
  dueDate: {
    type: Date
  },
  description: {
    type: String
  },
  listId: {
    type: String,
    required: [true, "The List ID is required"]
  },
  boardId: {
    type: String,
    required: [true, "The board ID is required"]
  },
  position: {
    type: Number,
    required: [true, "The position is required"],
    default: 65535
  },
  comments: {
    type: Array,
    default: []
  },
  completed: {
    type: Boolean,
    default: false
  },
  archived: {
    type: Boolean,
    default: false
  }
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;
