var mongoose = require("mongoose");

var conn = mongoose.connect("mongodb://localhost/photocontest",function() {
    console.log("mongodb Connected...");
	//mongoose.connection.db.dropDatabase();
})

function clearDB(req, res) {
	console.log("clearDB");
	var method = req.method;
	var key = null;
	console.log("clearDB: Method - " + method);
	if(method == 'GET') {
		key = req.query.key;
		console.log("clearDB: get - " + key);
	} else if(method == 'POST') {
		key = req.body.key;
		console.log("clearDB: post - " + key);
	}
	
	if(key === "Divami-Ph0t0-C0ntest") {
		console.log("clearDB: Start");
		console.log(conn);
		conn.connection.db.dropDatabase();
		console.log('clearDB: Completed');
		res.status(200).send({'status': 'success'});
	} else {
		res.send({'status': 'error', 'message':'Invalid Key'});
	}
}



function addRoutes(app) {
	console.log('DB routes added');
	
	app.route("/api/db/clear")
		.get(clearDB)
    	.post(clearDB);
}

module.exports = addRoutes;