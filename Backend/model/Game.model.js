const mongoose = require("mongoose");

const GameSchema = mongoose.Schema({
  _id: String,
  playerX: {type:String,default:"PlayerX"},
  playerO: {type:String,default:"PlayerO"},
  data: Array,
  result: String,
  datetime: Date,
});

const GameModel = mongoose.model("games", GameSchema);

module.exports = {GameModel}
