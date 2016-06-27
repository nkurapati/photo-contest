function uploadController($scope, restService, popupService) {
	
	$scope.onFileChange;
	$scope.imgUrl;
	
	$scope.photos = [{}];
	
	$scope.addAnotherFile = function() {
		$scope.photos.push({});
	}
	
	$scope.deleteFile = function(index) {
		$scope.photos.splice(index, 1);
	}

	$scope.onInputChange = function(elem) {
		$scope.$apply(function(scope) {
			var index = elem.getAttribute('data-index');
	        var photofile = elem.files[0];
			$scope.photos[index].file = photofile;
	        $scope.imgUrl = window.URL.createObjectURL(photofile);
			/*var reader = new FileReader();
			reader.onload = function(e) {
			// handle onload
			};
			reader.readAsDataURL(photofile);*/
	     });
	}
	
	$scope.onSubmission = function() {
		var data = new FormData();
		data.append('email', "narendra@divami.com");
		data.append('name', "Narendra Kurapati");
		var photo = $scope.photos[0];
		data.append('title', photo.title);
		data.append('description', photo.description);
		data.append('file', photo.file);
		debugger;
        /*var length = $scope.photos.length;
        for(var i=0; i<length; i++){
            var photo = $scope.photos[i];
            if(photo){
				debugger;
				data.append('files[' + i + '][title]', photo.title);
				data.append('files[' + i + '][description]', photo.description);
				data.append('files[' + i + '][file]', photo.file);
            }
        }*/
		
		restService.upload('upload', data).then(onSuccess);
	}
	
	var onSuccess = function(data) {
		var callback = $scope.gotoSubmissions;
		popupService.uploadSuccessPopup($scope, callback, callback);
	}
}

module.exports = uploadController;