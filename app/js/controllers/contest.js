function contestController($scope, authService) {
	$scope.showUploadForm = function() {
		authService.isLoggedIn().then(function(isLoggedIn) {
			if (isLoggedIn) {
				$scope.gotoUploadPhoto();
			} else {
				$scope.gotoLogin();
			}
		});
	}
}

module.exports = contestController;