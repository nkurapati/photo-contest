function submissionsService($q, $timeout, restService) {
	var submissionsService = {};
	
	var submissions = [];
	
	submissionsService.getSubmissions = function(){
		var promise = $q.defer();
		if (submissions.length) {
			$timeout(function() {
				promise.resolve(submissions);
			})
			return promise;
		} else {
			return restService.get("getSubmissions");
		}
	}
	return submissionsService;
}

module.exports = submissionsService;