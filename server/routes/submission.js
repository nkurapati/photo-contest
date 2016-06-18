
module.exports = function (app) {
	
    var SubmissionModel = require("./../models/submission.js");
    
    app.route("/api/submissions")
	.get(function(req, res) {
		console.log('Accessing submissions');
        SubmissionModel.find(function(err, doc) {
            var submissions = doc;
            res.send(submissions);
        });
    })
    .post(function(req, res) {
		/*var item = {
			id: "xyz",
			name: "Narendra",
			title: "Photo Contest",
			description: "Testing",
			image: "img",
			email: "narendra@divami.com"
		}*/
        
        var submission = new SubmissionModel(req.body);
        submission.save(function(error, data) {
            res.status(300).send();
        });
    });
}