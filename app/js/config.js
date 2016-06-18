require('angular-ui-router');

function config($stateProvider, $urlRouterProvider) {
	
	//Default url
	$urlRouterProvider.otherwise("");
	
	//Application states and urls
	$stateProvider
		.state('root', {
			url: "",
			templateUrl: "templates/root.html",
			controller: "rootController"
		})
		.state('root.login', {
			url: "/login",
			templateUrl: "templates/login.html",
			controller: "loginController"
		})
		.state('root.contest', {
			url: "/contest",
			templateUrl: "templates/contest.html",
			controller: "contestController"
		})
		.state('root.uploadPhoto', {
			url: "/uploadPhoto",
			templateUrl: "templates/upload.html",
			controller: "uploadController"
		})
		.state('root.submissions', {
			url: "/submissions",
			templateUrl: "templates/submissions.html",
			controller: "submissionsController"
		})
		.state('root.submission', {
			url: "/submissions/:id",
			templateUrl: "templates/submission.html",
			controller: "submissionController"
		})
}

module.exports = config;