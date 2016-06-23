require('./../../vendor/google-plus.js');
function rootController($scope, $state, $window) {
	$scope.userData = {};
	$window.onSignIn = function(googleUser) {
		var profile = googleUser.getBasicProfile();
		
		$scope.userData.id = profile.getId();
		$scope.userData.name = profile.getName();
		$scope.userData.image = profile.getImageUrl();
		$scope.userData.email = profile.getEmail();
		$scope.userData.isLoggedIn = true;
	}
	
	$scope.gotoLogin = function(data) {
		$state.transitionTo('root.login', data);
	}
	
	$scope.gotoContest = function(data) {
		$state.transitionTo('root.contest', data);
	}
	
	$scope.gotoUploadPhoto = function(data) {
		$state.transitionTo('root.uploadPhoto', data);
	}
	
	$scope.gotoSubmissions = function(data) {
		$state.transitionTo('root.submissions', data);
	}
	
	$scope.gotoSubmission = function(data) {
		$state.transitionTo('root.submission', data);
	}
}

module.exports = rootController;