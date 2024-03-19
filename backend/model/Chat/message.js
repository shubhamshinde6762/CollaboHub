const mongoose = require("mongoose");

const message = new mongoose.Schema({
    type : {
        type : String,
        required : true
    },

    chatId:{
        type : String,
        required : true
    },


    content : {
        type : "Mixed",
        required : true
    },

    sender : {
        type : mongoose.Schema.Types.Mixed,
        required : true
    },

    messageTime : {
        type : String,
        required : true
    },

    deliveryStatus : {
        type : {
            seen : [String],
            delivered : [String],
            remaining  : [String]
        },
        required : true
    },

    reactions : {
        type : [
            {
                _id : {
                    type : String,
                    required : true,
                },

                content : {
                    type : String,
                    required : true
                }
            }
        ]
    }
})

module.exports = mongoose.model("messages", message);