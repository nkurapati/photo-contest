function loginController($scope, $timeout, authService) {
	
	var gotoUploadPhoto = $scope.gotoUploadPhoto;
	
	//Google script taking time to load
	$timeout(function() {
		if(authService.isLoggedIn()) {
			gotoUploadPhoto();
			return;
		}
	}, 1000)
	
	$scope.login = function () {
		authService.login().then(function(data) {
			if(data) {
				gotoUploadPhoto();
			}
		});
    };
}

module.exports = loginController;