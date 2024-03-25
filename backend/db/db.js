const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = async () => {
    await mongoose.connect("mongodb+srv://shubhamshinde08:RYjNHZFbqpfrAVky@cluster01.zqqtbo0.mongodb.net/?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Mongo Connected");
    })
    .catch((err) => console.log(err));
}