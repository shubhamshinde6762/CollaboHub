const mongoose = require("mongoose");

const task = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },

  projectId: {
    type: String,
    required: true,
  },

  owner: {
    type: String,
    required: true,
  },

  priority: {
    type: String,
    required: true,
  },

  contributorsId: {
    type: [
        {
            _id:{
                type:String,
                required:true
            },

            completedOn:{
                type:String,
                default: null
            },

            comments:{
               type:String, 
               default: null
            }
        }
    ],
    required: true,
  },

  dueDate: {
    type: String,
  },

  createdOn: {
    type: String,
  },
});

module.exports = mongoose.model("task", task);
