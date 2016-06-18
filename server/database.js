var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/photocontest",function() {
    console.log("Connected...");
})