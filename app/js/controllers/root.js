function rootController($scope, $state, $window) {
	
	$scope.gotoLogin = function(data) {
		$state.transitionTo('root.login', data);
	}
	
	$scope.gotoContest = function(data) {
		$state.transitionTo('root.contest', data);
	}
	
	$scope.gotoUploadPhoto = function(data) {
		$state.transitionTo('root.uploadPhoto', data);
	}
	
	$scope.showAllUploadedPhotos = function(data) {
		$state.transitionTo('root.submissions', data);
	}
	
	$scope.gotoSubmission = function(data) {
		$state.transitionTo('root.submission', data);
	}
}

module.exports = rootController;