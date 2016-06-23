function contestController($scope, $state) {
	$scope.showUploadForm = function() {
		if ($scope.userData.isLoggedIn) {
			$scope.gotoUploadPhoto();
		} else {
			$scope.gotoLogin();
		}
	}
}

module.exports = contestController;