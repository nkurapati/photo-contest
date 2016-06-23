function uploadController($scope, restService, popupService) {
	
	$scope.onSubmission = function() {
		var obj = {
			name: 'Narendra',
			title: 'Photo Contest' + new Date(),
			description: 'Photo Contest' + new Date(),
			image: "",
			email: "narendra@divami.com"
		};
		
		restService.upload('upload', obj).then(function() {alert('success')});
	}
	
	var onSuccess = function(data) {
		var callback = $scope.gotoSubmissions;
		popupService.uploadSuccessPopup($scope, callback, callback);
	}
}

module.exports = uploadController;