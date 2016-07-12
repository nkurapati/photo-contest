function uploadController($scope, restService, popupService, authService) {
	
	var userData = authService.getUserData();
	if(!userData) {
		$scope.gotoLogin();
		return;
	}
	$scope.onFileChange;
	$scope.imgUrl;
	$scope.prevId = null;
	
	$scope.photos = [];



	$scope.getUserUploadedPhotos = function() {
		var data = {"email": userData.email};
		restService.post('getSubmissions', data).then(onUserDetailsSuccess);
	};

	var onUserDetailsSuccess = function(data) {
		for (var i = 0, len = data.data.length; i < len; i++) {
			data.data[i].imgUrl = "http://contest.divami.com/uploads/" + data.data[i].filename;
			$scope.photos.push(data.data[i]);
		}
	};

	$scope.getUserUploadedPhotos();


	
	$scope.addAnotherFile = function() {
		$scope.photos.push({});
	}
	
	$scope.deleteFile = function(index) {
		$scope.photos.splice(index, 1);
	}

	$scope.selectPhotosFromLocal = function() {
		var elem = document.getElementById('file_upload_field');
		elem.click();
	}

	$scope.onInputChange = function(elem) {
		var filesLen = elem.files.length;
		$scope.$apply(function(scope) {
			for (var i = 0; i < filesLen; i++) {
				var obj = {};
				var file = elem.files[i];

				obj.file = file;
				obj.uniqueId = file.name + "_" + Math.random();
				obj.imgUrl = window.URL.createObjectURL(file);
				obj.title = "";
				obj.description = "";
				obj.showTitleOverlay = false;
				$scope.photos.push(obj);
			}
		});
		

		/**/

		//$scope.$apply(function(scope) {
			
			/*var index = elem.getAttribute('data-index');
	        var photofile = elem.files[0];
			$scope.photos[index].file = photofile;
	        $scope.imgUrl = window.URL.createObjectURL(photofile);*/
			/*var reader = new FileReader();
			reader.onload = function(e) {
			// handle onload
			};
			reader.readAsDataURL(photofile);*/
	    // });
	}

	$scope.addDetailsAboutPhoto = function() {
		alert("Add photo details");
	}

	/**
	 * shows the overlay for entering the details about the photo of the current selected photo
	*/ 
	$scope.showTitleOverlay = function(id) {
		$scope.tooglePreviousElementOverlay();
		$scope.photos[id].showTitleOverlay = true;
		$scope.prevId = id;
	}

	/**
	 * this function hides the overlay of the element based on the index.
	*/ 
	$scope.hideOverlay = function(index) {
		$scope.photos[index].showTitleOverlay = false;
	}

	/**
	 * this function checks if there is any overlay opened otherthan the current selected elememt and toogles it state.
	*/ 
	$scope.tooglePreviousElementOverlay = function() {
		if ($scope.prevId != null && $scope.photos[$scope.prevId].showTitleOverlay) {
			$scope.photos[$scope.prevId].showTitleOverlay = false;
		}
	}

	/**
	 * this function removes the photo from the list
	*/
	$scope.removeThisPhoto = function(index) {
		$scope.photos.splice(index, 1);
	} 

	/**
	 * this function uploads the photos to the server
	*/ 
	$scope.uploadPhotosToServer = function() {
		var isValid = $scope.validateInputFields();

		if (isValid) {
			for (var i = 0, len = $scope.photos.length; i < len; i++) {
				var formData = new FormData();
				var photo = $scope.photos[i];

				formData.append('email', userData.email);
				formData.append('name', userData.name);
				formData.append('title', photo.title);
				formData.append('description', photo.description);
				formData.append('file', photo.file);
				formData.append('uniqueId', photo.uniqueId);

				restService.upload('upload', formData).then(onSuccess);
			}
		} else {
			alert ("Please give title and description for the photos that are marked in red");
		}
	}

	/**
	 * This function validates whether the description and title are applied for all the selected photos
	*/
	$scope.validateInputFields = function() {
		for (var i = 0 , len = $scope.photos.length; i < len; i++) {
			var photo = $scope.photos[i];

			if (photo.title == "" || photo.description == "") {
				return false;
			} 
		}
		return true;
	}
	
	/*$scope.onSubmission = function() {
		var data = new FormData();
		data.append('email', userData.email);
		data.append('name', userData.name);
		var photo = $scope.photos[0];
		data.append('title', photo.title);
		data.append('description', photo.description);
		data.append('file', photo.file);
		debugger;
        var length = $scope.photos.length;
        for(var i=0; i<length; i++){
            var photo = $scope.photos[i];
            if(photo){
				debugger;
				data.append('files[' + i + '][title]', photo.title);
				data.append('files[' + i + '][description]', photo.description);
				data.append('files[' + i + '][file]', photo.file);
            }
        }
		
		restService.upload('upload', data).then(onSuccess);
	}*/
	
	var onSuccess = function(data) {
		/*var callback = $scope.gotoSubmissions;
		popupService.uploadSuccessPopup($scope, callback, callback);*/
	}
}

module.exports = uploadController;