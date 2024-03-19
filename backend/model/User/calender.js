const mongoose = require("mongoose");

const calender = new mongoose.Schema({
    userId:{
        type:String,
        required:true, 
    },
 
    socketIds:{    
        type:[String],
    }
})

module.exports = mongoose.model("calender", calender);