const mongoose = require("../connection");

const schema = new mongoose.Schema({
  title: String,
  tags: Array,
  description: String,
  thumbnail : String,
  file: String,
  author: {type: mongoose.Types.ObjectId, ref: 'users'},
  created: {type: Date, default: new Date()}
});

const model = mongoose.model("podcasts", schema);

module.exports = model;
