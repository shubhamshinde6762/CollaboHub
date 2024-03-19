const mongoose = require("mongoose");

const chat = new mongoose.Schema({
    type : {
        type : String,
        required : true
    },
    
    lastMessage:{
        type : {}
    },

    persons : {
        type : [],
        required : true
    },

    group : {
        type : {
            admin : {
                type : [String],
            },

            profilePhoto : {
                type : String,
                default:"https://res.cloudinary.com/dd6sontgf/image/upload/v1706275257/icons8-user-100_i1ye5n.png"
            },

            chatName : {
                type : String,
            },

            groupMembers : {
                type : [String],
            }
        }, 

        default : {
            admin : [],
            groupMembers : []

        }
    },


    messageId : {
        type : [String]
    },


})

module.exports = mongoose.model("chat", chat);