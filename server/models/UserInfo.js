var mongoose = require("mongoose");
module.exports = mongoose.model("UserInfo",{
    "id": Number,
    "name": String,
    "age": Number,
    "tel": Number,
    "address":String,
    "date":Date,
    "sex":String

})