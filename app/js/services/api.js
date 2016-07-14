function apiService() {
	//Backend server url
	var serverBasePath = "http://contest.divami.com:8081/api/";

	//Server paths for api names
	var serverApiPaths = {
        login: "login",
		getSubmissions: "submissions",
		upload: "upload", 
		deleteAllPhotos: "delete",
		deletePhoto: "delete"
	};
	
	/**
	 * @name getUrl
	 * @param {String} apiName Name of the API
	 * @return {String} URL
	 * @description This function returns url(local json url or live server url) for given api based on the offline flag
	 */
	function getUrl(apiName) {
		var url = serverBasePath + serverApiPaths[apiName];
		return url;
	};
	
	return {
		'getUrl': getUrl
	}
}

module.exports = apiService;
