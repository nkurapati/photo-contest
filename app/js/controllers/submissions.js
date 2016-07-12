function submissionsController($scope, submissionsService, restService, $uibModal) {
	$scope.photos = [];

	$scope.open = function (size, selItemIndex) {

		var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: '../templates/photo-item.html',
			controller: 'photoLargeController',
			size: size,
			resolve: {
				items: function () {
					var obj = {};
					obj.photos = $scope.photos;
					obj.selectedItemIndex = selItemIndex;
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
		restService.get('getSubmissions').then(onUserDetailsSuccess);
	};

	var onUserDetailsSuccess = function(data) {
		for (var i = 0, len = data.data.length; i < len; i++) {
			data.data[i].imgUrl = "http://contest.divami.com/uploads/" + data.data[i].filename;
			$scope.photos.push(data.data[i]);
		}
	};

	$scope.getAllPhotos();
}

module.exports = submissionsController;