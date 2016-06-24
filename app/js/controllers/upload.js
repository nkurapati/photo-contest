function uploadController($scope, restService, popupService) {
	
	$scope.onFileChange;
	$scope.imgUrl;

	$scope.onInputChange = function(elem) {
		$scope.$apply(function(scope) {
	         var photofile = elem.files[0];
	         $scope.imgUrl = window.URL.createObjectURL(photofile);
	         /*var reader = new FileReader();
	         reader.onload = function(e) {
	            // handle onload
	         };
	         reader.readAsDataURL(photofile);*/
	     });
	}
	
	$scope.onSubmission = function() {
		var obj = {
			name: 'Narendra',
			title: 'Photo Contest' + new Date(),
			description: 'Photo Contest' + new Date(),
			image: "",
			email: "narendra@divami.com"
		};
		
		restService.upload('upload', obj).then(onSuccess);
	}
	
	var onSuccess = function(data) {
		var callback = $scope.gotoSubmissions;
		popupService.uploadSuccessPopup($scope, callback, callback);
	}
}

module.exports = uploadController;