var SubmissionModel = require("./../models/submission.js");
var q = require('q');
var upload = require('./../upload.js');

function getSubmissions(data) {
	var deferred = q.defer();
	data = data || {};
	SubmissionModel.find(data, function(err, doc) {
		deferred.resolve(doc);
	});
	return deferred.promise;
}

function getList(req, res) {
	var data = req.body;
	console.log(req.method);
	console.log('Get Submissions');
	getSubmissions(data).then(function(data) {
		console.log('Success: Get Submissions');
		res.status(200).send(data);
	});
}

function processData(req, res) {
	console.log('processData');
	upload(req, res, function(err) {
		if(err) {
			console.log(err);
			return res.end("Error uploading file.");
		}
		var data = req.body;
		if(data["_id"]) {
			updateSubmission(req, res, data);
		} else {
			addSubmission(req, res, data);
		}
	});
}

function addSubmission(req, res, data) {
	console.log('AddSubmission');
	var file = req.file;
	if(file) {
		data.filename = file.filename;
		data.mimetype = file.mimetype;
		data.size = file.size;
	}
	console.log(data);
	var submission = new SubmissionModel(data);
	submission.save(function(error, newData) {
		console.log('Success: AddSubmission');
		res.status(200).send(newData);
	});
}


function updateSubmission(req, res, data) {
	console.log('UpdateSubmission');
	//var submission = new SubmissionModel();
	var query = data["_id"];
	var options = { multi: true };
	SubmissionModel.update(query, data, options, function(err, doc) {
		if (err) {
			console.log("Update failed..");
			res.end("Error updating data.");
		}
		console.log('Success: UpdateSubmission');
		res.status(200).send();
	});
}

function deleteSubmissions(data) {
	var deferred = q.defer();
	data = data || {};
	SubmissionModel.remove(data, function(err, doc) {
		deferred.resolve(doc);
	});
	return deferred.promise;
}

function deleteSubmission(req, res) {
	console.log('Remove Submissions');
	var data = req.body || {};
	if(data['_id'] || data.email) {
		console.log(data);
		deleteSubmissions(data).then(function(doc) {
			var payload = {};
			payload.success = true;
			payload.count = doc.result.n;
			
			console.log('Success: Remove Submissions');
			console.log(payload);
			res.status(200).send(payload);
		});
	} else {
		res.end("No Data is passed. Either _id or email is mandatory.");
	}
}

function addRoutes(app) {
	console.log('Submission routes added');
	
	app.route("/api/submissions")
		.get(getList)
    	.post(getList);
	
	app.route("/api/upload")
    	.post(processData);
	
	app.route("/api/delete")
    	.post(deleteSubmission);
}

module.exports = addRoutes;
