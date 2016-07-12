require('angular-ui-router');

var googleClientId = "768640013294-s68jbd29036350je83lv25tc07u9ltbg.apps.googleusercontent.com";
var googleApiKey = "AIzaSyAQ9dvVSiwqtdoEfRcXDYplw39ndK7_u1g";

//var googleClientId = "40145754411-2po7c57cmg5q8chjh2mdft6q39tnfu9k.apps.googleusercontent.com";
//var googleApiKey = "AIzaSyBI3SCag1Cu1EVxsOc4gM0dkptep6-CSS0";

function config($stateProvider, $urlRouterProvider, GooglePlusProvider) {
	
	GooglePlusProvider.init({
		clientId: googleClientId,
		apiKey: googleApiKey
	});
	
	//Default url
	$urlRouterProvider.otherwise("/contest");
	
	//Application states and urls
	$stateProvider
		.state('root', {
			url: "/",
			templateUrl: "templates/root.html",
			controller: "rootController"
		})
		.state('root.login', {
			url: "login",
			templateUrl: "templates/login.html",
			controller: "loginController"
		})
		.state('root.contest', {
			url: "contest",
			templateUrl: "templates/contest.html",
			controller: "contestController"
		})
		.state('root.uploadPhoto', {
			url: "uploadPhoto",
			templateUrl: "templates/upload.html",
			controller: "uploadController"
		})
		.state('root.submissions', {
			url: "submissions",
			templateUrl: "templates/submissions.html",
			controller: "submissionsController"
		})
		.state('root.submission', {
			url: "submissions/:id",
			templateUrl: "templates/submission.html",
			controller: "submissionController"
		})
}

module.exports = config;
