function photoLargeController(items, $scope) {
	$scope.photos = items.photos;
	$scope.active = items.selectedItemIndex;
}
module.exports = photoLargeController;