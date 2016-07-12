function authService($q, $timeout, GooglePlus) {

    var authService = {};
	var userData = null;
	
	authService.login = function() {
		var deferred = $q.defer();
		GooglePlus.login().then(function (authResult) {
			console.log(authResult);
			GooglePlus.getUser().then(function (user) {
				console.log(user);
				if(user) {
					userData = user;
					Object.freeze(userData);
				}
				deferred.resolve(userData);
			});
		}, function (err) {
            console.log(err);
        });
		return deferred.promise;
	}
	
	authService.getUserEmail = function() {
		return userData.email;
	}


	authService.getUserData = function() {
		return userData;
	}
	
	authService.isLoggedIn = function() {
		var deferred = $q.defer();
		if(userData) {
			$timeout(function() {
				deferred.resolve(true);
			});
		} else {
			authService.login().then(function (data) {
				if(data && !data.error) {
					deferred.resolve(true);	
				} else {
					deferred.resolve(false);
				}
			}, function (err) {
				console.log(err);
				deferred.resolve(false)
			});
		}
		
		return deferred.promise;
	}
    
    return authService;
 }

module.exports = authService;
