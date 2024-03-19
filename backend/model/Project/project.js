const mongoose = require("mongoose");

const project = new mongoose.Schema({
    projectName : {
        type : String,
        required : true
    },

    taskIds : {
        type: [String],
    },

    owners: {
        type : [String],
    },

    contributorsIds : {
        type : [{
            _id:{
                type:String,
                required:true
            },

            contributingTask:{
                type:[String],
            },

            createdTask:{
                type:[String]
            }
        }],
    },

    chatId : {
        type : String,
        required : true,
    },

    invitedIds : {
        type : [String]
    }
})

module.exports = mongoose.model("Project", project)