function submissionsController($scope, submissionsService) {
	$scope.submissions = [];
	
	submissionsService.getSubmissions().then(function(response) {
		$scope.submissions = response.data || [];
	});
	
	$scope.openSubmission = function(id) {
		$scope.gotoSubmission({id:id});
	}
}

module.exports = submissionsController;