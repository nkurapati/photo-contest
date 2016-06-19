function rootController($scope, $state) {
	$scope.showUploadForm = function() {
		$state.transitionTo('root.submission');
	};
}

module.exports = rootController;