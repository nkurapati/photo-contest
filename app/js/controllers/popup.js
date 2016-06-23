function popupController($scope, popupService) {
	
	$scope.message = popupService.getData('message');
	
	$scope.close = function() {
		popupService.cancelCallback();
	}
	
	$scope.cancel = function() {
		popupService.cancelCallback();
	}
	
	$scope.submit = function() {
		popupService.submitCallback();
	}
	
}

module.exports = popupController;