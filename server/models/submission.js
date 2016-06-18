var mongoose = require("mongoose");

var SubmissionSchema = {
	id: String,
    name: String,
	title: String,
	description: String,
	image: String,
	email: String
};

var SubmissionModel = mongoose.model("Submission", SubmissionSchema, "submissions");

module.exports = SubmissionModel;