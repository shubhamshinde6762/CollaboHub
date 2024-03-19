const mongoose = require("mongoose");

const notes = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  title: {
    type: String,
  },

  description: {
    type: String,
  },

  lastEdited: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("notes", notes);
