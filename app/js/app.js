var angular  = require("angular");
var app = angular.module('PhotoContest', [
	'ui.router'
]);


//Load Config file
app.config(require("./config.js"));
//load Run file
app.run(require("./run.js"));

//Load Controllers
app.controller('rootController', require('./controllers/root.js'));
app.controller('loginController', require('./controllers/login.js'));
app.controller('contestController', require('./controllers/contest.js'));
app.controller('uploadController', require('./controllers/upload.js'));
app.controller('submissionsController', require('./controllers/submissions.js'));
app.controller('submissionController', require('./controllers/submission.js'));

//Load Services
//app.service('service', require('./service'));


//Load Directives
