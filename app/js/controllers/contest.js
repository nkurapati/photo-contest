function contestController($scope, authService) {
	$scope.showUploadForm = function() {
		authService.isLoggedIn().then(function(isLoggedIn) {
			if (isLoggedIn) {
				var userEmail = (authService.getUserEmail()).toLowerCase();
				if (userEmail == "deo@divami.com") {
					$scope.showAllUploadedPhotos();
				} else {
					$scope.gotoUploadPhoto();
				}
			} else {
				$scope.gotoLogin();
			}
		});
	}
}

module.exports = contestController;