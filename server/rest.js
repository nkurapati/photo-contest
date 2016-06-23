var express = require("express");
var parser = require("body-parser");

require("./database.js");


var app = new express();

app.get("/", function(req, res) {
	res.send("Server Running...");
});

app.listen(8081, function() {
	console.log("Server Started");
})
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
});

app.use(parser.json());
app.use(parser.urlencoded({extended: false}));

require("./routes/submission.js")(app);
