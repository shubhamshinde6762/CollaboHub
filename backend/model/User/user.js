const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    }, 

    username:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true

    },
 
    password:{
        type:String,
        required:true

    },

    profilePhoto:{
        type:String,
        default:"https://res.cloudinary.com/dd6sontgf/image/upload/v1706275257/icons8-user-100_i1ye5n.png"
    },

    token:{
        type:String,
    },

    projectIds : {
        type : [String]
    },

    invitedProjectIds: {
        type : [String]
    },

    notification : {
        type:[String]
    },

    chatPerson : {
        type:[String],
        default:[]
    },

    chatGroup : {
        type:[String],
        default:[]
    },

    lastUpdated : {     
        type : [String],
    },

    notes : {
        type : [String],
        default: []
    }
});

module.exports = mongoose.model("Users", schema);