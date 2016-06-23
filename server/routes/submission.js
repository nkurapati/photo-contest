var SubmissionModel = require("./../models/submission.js");
function processData(req, res) {
	console.log('processData');
	var data = req.body;
	if(Object.keys(data).length) {
		addSubmission(req, res, data)
	} else {
		getSubmissions(req, res);
	}
}

function getSubmissions(req, res) {
	console.log('GetSubmission');
	SubmissionModel.find(function(err, doc) {
		console.log('Success: GetSubmission');
		res.send(doc);
	});
}

function addSubmission(req, res, data) {
	console.log('AddSubmission');
	var submission = new SubmissionModel(data);
	submission.save(function(error, data) {
		console.log('Success: AddSubmission');
		res.status(300).send();
	});
}


function updateSubmission(req, res, data) {
	console.log('UpdateSubmission');
	var submission = new SubmissionModel(data);
	submission.save(function(error, data) {
		console.log('Success: UpdateSubmission');
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
