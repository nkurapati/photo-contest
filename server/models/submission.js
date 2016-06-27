var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SubmissionSchema = new Schema({
    name: String,
	email: String,
	title: String,
	description: String,
	filename: String,
	mimetype: String,
	size: Number
},{
	timestamps: true
});

//createdDate: {type: Date, default:Date.now},
//modifiedDate: {type: Date, default:Date.now}
var SubmissionModel = mongoose.model("Submission", SubmissionSchema);

module.exports = SubmissionModel;