const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Board title is required']
  },
  boardId: {
    type: String,
    required: [true, 'The Board ID is required']
  },
  position: {
    type: Number,
    required: [true, 'The position is required'],
    default: 65535
  },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Card"
    }
  ]
});

const List = mongoose.model('List', ListSchema);

module.exports = List;
