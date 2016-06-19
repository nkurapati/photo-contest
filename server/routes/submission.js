var SubmissionModel = require("./../models/submission.js");
function processData(req, res) {
	var data = req.body;
	if(Object.keys(data).length) {
		addSubmission(req, res, data)
	} else {
		getSubmissions(req, res);
	}
}

function getSubmissions(req, res) {
	SubmissionModel.find(function(err, doc) {
		res.send(doc);
	});
}

function addSubmission(req, res, data) {
	var submission = new SubmissionModel(data);
	submission.save(function(error, data) {
		res.status(300).send();
	});
}


function updateSubmission(req, res, data) {
	var submission = new SubmissionModel(data);
	submission.save(function(error, data) {
		res.status(300).send();
	});
}


function addRoutes(app) {
	console.log('Routes added');
	app.route("/api/submissions")
	.get(processData)
    .post(processData);
}
module.exports = addRoutes;
