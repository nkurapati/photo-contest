function popupService($compile, restService) {
	
	var popupService = {};
	var popupData = {};
	
	popupService.clearData = function(data){
		popupData = {};
	}
	
    popupService.submitCallback = function(data){
        popupService.closePopup();
        if(popupData.submitCallback){
            popupData.submitCallback(data);
        }
        popupService.clearData();
    }
    
    
    popupService.cancelCallback = function(data){
        popupService.closePopup();
        if(popupData.cancelCallback){
            popupData.cancelCallback(data);
        }
        popupService.clearData();
    }
	
	popupService.closePopup = function(){
		var popupElem = popupData.popupElem;
        if(!popupElem){
            popupElem = angular.element('.popup');
        }
        popupElem.css('display', 'none');
    }
	
	popupService.getData = function(key) {
        return popupData[key];
    }
	
	popupService.showPopup = function(scope, html, message, submitCallback, cancelCallback) {
		
		var popupElem = document.getElementsByClassName('popup')[0];
		popupElem = angular.element(popupElem);
		 
		popupData.message = message;
		popupData.submitCallback = submitCallback;
		popupData.cancelCallback = cancelCallback;
		popupData.popupElem = popupElem;
		
		restService.getHtml(html).then(function(response, dat) {
			var data = response.data;
			if (data) {
				popupElem.html(data);
				$compile(popupElem.contents())(scope);
				setTimeout(function () {
					scope.$apply(function () {
						popupElem.css('display', 'block');
					});
				}, 200);
			}
		});
	}

	popupService.showInfoPopup = function(scope, message, submitCallback, cancelCallback) {
		var html = 'templates/info-popup.html';
		popupService.showPopup(scope, html, message, submitCallback, cancelCallback);
	}
	
	popupService.uploadSuccessPopup = function(scope, submitCallback, cancelCallback) {
		var message = "Upload is successful";
		popupService.showInfoPopup(scope, message, submitCallback, cancelCallback);
	}
	
	return popupService;
}

module.exports = popupService;
