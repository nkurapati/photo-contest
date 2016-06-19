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

app.use(parser.json());
app.use(parser.urlencoded({extended: false}));

require("./routes/submission.js")(app);
