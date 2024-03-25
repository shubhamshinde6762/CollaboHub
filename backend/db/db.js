const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = async () => {
    await mongoose.connect(process.env.URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Mongo Connected");
    })
    .catch((err) => console.log(err));
}