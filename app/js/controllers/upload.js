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

	$scope.selectedPhotos = [];
	$scope.uploadedPhotos = [];
	$scope.uploadedPhotoCount = 0;
	$scope.photosInUploadProcessLength = 0;
	$scope.uploadNotInProgress = true;



	$scope.getUserUploadedPhotos = function() {
		var data = {"email": userData.email};
		restService.post('getSubmissions', data).then(onUserDetailsSuccess);
	};

	var onUserDetailsSuccess = function(data) {
		for (var i = 0, len = data.data.length; i < len; i++) {
			$scope.uploadedPhotos.push(data.data[i]);
			//data.data[i].imgUrl = "http://contest.divami.com/uploads/" + data.data[i].filename;
			//$scope.photos.push(data.data[i]);
		}
		$scope.uploadedPhotoCount = $scope.uploadedPhotos.length;
	};

	/**
	 * this function delets all the photos of the given user.
	*/ 
	$scope.deleteAllPhotos = function() {
		var data = {"email": userData.email};
		restService.post('deleteAllPhotos', data).then(onAllPhotosDeleted);
	}

	var onAllPhotosDeleted = function(data) {
		alert(data);
	};

	//$scope.deleteAllPhotos();
	$scope.getUserUploadedPhotos();
	
	$scope.addAnotherFile = function() {
		$scope.photos.push({});
	}
	
	$scope.deleteFile = function(index) {
		$scope.selectedPhotos.splice(index, 1);
		//$scope.photos.splice(index, 1);
	}

	$scope.selectPhotosFromLocal = function() {
		var elem = document.getElementById('file_upload_field');
		elem.click();
	}

	$scope.onInputChange = function(elem) {
		var filesLen = elem.files.length;
		var remainingCount = 5;
		$scope.$apply(function(scope) {
			if ($scope.uploadedPhotoCount  == 0 && $scope.selectedPhotos.length == 0) { 
				if (filesLen >  5) {
					alert("Hello, you can upload only 5 files for the contest. so only first five selected files will be considered.")
				} 
			} else {
				remainingCount = remainingCount - ($scope.uploadedPhotoCount  + $scope.selectedPhotos.length);

				if (filesLen > remainingCount) {
					alert("Hi, Already you have uploaded/selected "+ ($scope.uploadedPhotoCount + $scope.selectedPhotos.length) +" photos. You can upload only " + remainingCount + "photo(s)")
				}
			}

			for (var i = 0; i < remainingCount; i++) {
				var obj = {};
				var file = elem.files[i];

				obj.file = file;
				obj.uniqueId = file.name + "_" + Math.random();
				obj.imgUrl = window.URL.createObjectURL(file);
				obj.title = "";
				obj.description = "";
				obj.showTitleOverlay = false;
				obj.uploadInProgress = false;
				obj.uploadSuccess = false;
				$scope.selectedPhotos.push(obj);
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
		$scope.selectedPhotos[id].showTitleOverlay = true;
		$scope.prevId = id;
	}

	/**
	 * this function hides the overlay of the element based on the index.
	*/ 
	$scope.hideOverlay = function(index) {
		$scope.selectedPhotos[index].showTitleOverlay = false;
	}

	/**
	 * this function checks if there is any overlay opened otherthan the current selected elememt and toogles it state.
	*/ 
	$scope.tooglePreviousElementOverlay = function() {
		if ($scope.prevId != null && $scope.selectedPhotos[$scope.prevId].showTitleOverlay) {
			$scope.selectedPhotos[$scope.prevId].showTitleOverlay = false;
		}
	}

	/**
	 * this function removes the photo from the list
	*/
	$scope.removeThisPhoto = function(index, photoId) {
		$scope.selectedPhotos.splice(index, 1);
		//$scope.deletePhoto(photoId);
	} 

	/**
	 *
	*/
	$scope.deletePhoto = function (photoId, index) {
		var data = {"_id": photoId};
		$scope.uploadedPhotos.splice(index, 1);
		$scope.uploadedPhotoCount = $scope.uploadedPhotos.length;
		restService.post("deletePhoto", data).then(onPhotoDelete);
	}

	var onPhotoDelete = function (data) {
		alert("Photo has been deleted successfully");
	}

	/**
	 * this function uploads the photos to the server
	*/ 
	$scope.uploadPhotosToServer = function() {
		var isValid = $scope.validateInputFields();

		if (isValid) {
			$scope.photosInUploadProcessLength = $scope.selectedPhotos.length;
			$scope.uploadNotInProgress = false;
			for (var i = 0, len = $scope.selectedPhotos.length; i < len; i++) {
				$scope.selectedPhotos[i].uploadInProgress = true;
				var formData = new FormData();
				var photo = $scope.selectedPhotos[i];

				formData.append('email', userData.email);
				formData.append('name', userData.name);
				formData.append('title', photo.title);
				formData.append('description', photo.description);
				formData.append('file', photo.file);
				formData.append('uniqueId', photo.uniqueId);

				restService.upload('upload', formData).then(onSuccess);
			}
		} else {
			alert ("Please give title and description for all the selected photos");
		}
	}

	/**
	 * This function validates whether the description and title are applied for all the selected photos
	*/
	$scope.validateInputFields = function() {
		for (var i = 0 , len = $scope.selectedPhotos.length; i < len; i++) {
			var photo = $scope.selectedPhotos[i];

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
		if (data.status == 200) {
			var result = data.data
			for (var i = 0; i < $scope.selectedPhotos.length; i++) {
				if (result.uniqueId == $scope.selectedPhotos[i].uniqueId) {
					$scope.selectedPhotos[i].uploadInProgress = false;
					$scope.selectedPhotos[i].uploadSuccess = true;
					$scope.photosInUploadProcessLength = $scope.photosInUploadProcessLength - 1;
					if ($scope.photosInUploadProcessLength == 0) {
						//do page refresh;
						//alert("All the photos has been uploaded successfully")
						window.location.reload();
					}
					break;
				}
			}
		}
		//alert(data)
		/*var callback = $scope.gotoSubmissions;
		popupService.uploadSuccessPopup($scope, callback, callback);*/
	}
}

module.exports = uploadController;