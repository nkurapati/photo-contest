function submissionController($scope) {
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
}

module.exports = submissionController;