const mongoose = require("mongoose");

const connectedUser = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },

    socketIds:{
        type:[String],
    }
})

module.exports = mongoose.model("connectedUsers", connectedUser);