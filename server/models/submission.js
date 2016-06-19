var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SubmissionSchema = {
    name: String,
	title: String,
	description: String,
	image: String,
	email: String
};

var SubmissionModel = mongoose.model("Submission", SubmissionSchema);

module.exports = SubmissionModel;