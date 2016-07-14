function loginController($scope, $timeout, authService) {
	
	var gotoUploadPhoto = $scope.gotoUploadPhoto;
	
	//Google script taking time to load
	$timeout(function() {
		authService.isLoggedIn().then(function() {
			gotoUploadPhoto();
			return;
		})
	}, 1000)

	/*$scope.checkForLogin = function() {
		if(authService.isLoggedIn()) {
			gotoUploadPhoto();
			return;
		}
	}*/
	
	$scope.login = function () {
		authService.login().then(function(data) {
			if(data) {
				gotoUploadPhoto();
			}
		});
    };

    //$scope.checkForLogin();
}

module.exports = loginController;