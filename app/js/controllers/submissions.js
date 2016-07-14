function submissionsController($scope, submissionsService, restService, $uibModal, authService) {
	$scope.photos = [];
	$scope.submittedUsers = [];

	$scope.open = function (size, selItemIndex) {
		for (var i = 0; i < $scope.photos[selItemIndex].submissions.length; i++) {
			$scope.photos[selItemIndex].submissions[i].imgUrl = "http://contest.divami.com/uploads/" + $scope.photos[selItemIndex].submissions[i].filename;
		}
		var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: '../templates/photo-item.html',
			controller: 'photoLargeController',
			size: size,
			resolve: {
				items: function () {
					var obj = {};
					obj.photos = $scope.photos[selItemIndex].submissions;
					obj.selectedItemIndex = 0;
				  	return obj;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
			}, function () {
		});
	}
	
	$scope.getAllPhotos = function() {
		var userData = authService.getUserData();
		//restService.get('getSubmissions').then(onUserDetailsSuccess);
		var groupDataBy = {
			"groupBy": "email"
		};
		restService.post('getSubmissions', groupDataBy).then(onUserDetailsSuccess);
	};

	var onUserDetailsSuccess = function(data) {
		for (var i = 0, len = data.data.length; i < len; i++) {
			//$scope.submittedUsers.push(data.data[i])
			data.data[i].submissions[0].imgUrl = "http://contest.divami.com/uploads/" + data.data[i].submissions[0].filename;
			var dataObj = {
				"length": data.data[i].submissions.length,
				"data": data.data[i].submissions[0]
			};
			$scope.submittedUsers.push(dataObj);
			//data.data[i].imgUrl = "http://contest.divami.com/uploads/" + data.data[i].filename;
			$scope.photos.push(data.data[i]);
		}
	};

	$scope.getAllPhotos();
}

module.exports = submissionsController;