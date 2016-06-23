function cookieService($cookies) {

    var cookieService = {}
    
    cookieService.set = function(key, value){
        //Setting a cookie
        $cookies[key] = value;
    }
    
    cookieService.get = function(key){
        return $cookies[key];
    }
	
	cookieService.delete = function(key){
        delete $cookies[key];
    }
    
    return cookieService; 
 }

module.exports = cookieService;
