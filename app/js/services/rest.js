function rootService($http, apiService) {
	
	var rest = {};
	
	
	rest.post = function(api, params) {
		var url = apiService.getUrl(api);
		return $http.post(url, postParams);
	}
	
	
	rest.get = function(api, params) {
		var url = apiService.getUrl(api);
		return $http.get(url);
	}
	
	
	rest.upload = function(api, params) {
		var url = apiService.getUrl(api);
		
		var optionalData = {
		  transformRequest: angular.identity,
		  headers: {'Content-Type': undefined} //Content type will decide at runtime as multipart/form-data
		}

		return $http.post(url, postParams, optionalData);
	}

	return rest;
}

module.exports = rootService;