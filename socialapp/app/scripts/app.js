var app = angular.module('socialApp',[]);
// Left pane Controller for populating the feeds from Facebook
app.controller('leftPaneController',['$scope','feedsFactory','$filter','postFeedsFactory','$rootScope' ,function ($scope,feedsFactory,$filter,postFeedsFactory,$rootScope) {
	feedsFactory.getFeeds().then(onSuccessFunction,onErrorFunction);
	function onSuccessFunction (response) {
		$scope.filteredFeeds = response.data.data;
		// This returns the feeds which are being displayed with or without being filtered
	 	$scope.getData = function (filteredFeeds, feedSearch) {
	      	$scope.queryData = $filter('filter')(filteredFeeds, feedSearch);
	    };
		$scope.saveFeeds = function(){
			postFeedsFactory.postFeeds($scope.queryData,function(data){
				if(data.result && data.result.ok===1){
					$rootScope.$broadcast('retrieveFeeds');	
					console.log('success');				
			  	} else{
				  	console.log('error');
			  	}
			});
		}
	}
	function onErrorFunction (response) {
		alert('Token expired, please get another one grom facebook graph');
	}
}]);
// Right pane Controller for populating the feeds from Mongo DB
app.controller('rightPaneController',['$scope','$rootScope','postFeedsFactory',function($scope,$rootScope,postFeedsFactory){
	// This function returns the feeds that were stored before in Mongo DB
	postFeedsFactory.getFeeds(function(data){
		$scope.savedFilteredFeeds = data;
	});
	// This function returns the feeds that were stored in Mongo DBafter the feeds are being saved from left pane
	$rootScope.$on('retrieveFeeds',function(){
		console.log('retrieveFeeds');
		postFeedsFactory.getFeeds(function(data){
			$scope.savedFilteredFeeds = data;
		});		
	});
}]);
// The custom directive has been implemented for the feeds which doesn't show any images such that the default image needs to be provided
app.directive('checkImage', function ($q) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            attrs.$observe('ngSrc', function (ngSrc) {
                var deferred = $q.defer();
                var image = new Image();
                image.onerror = function () {
                    deferred.resolve(false);
                    element.attr('src', 'images/dummy1.jpg'); // set default image
                };
                image.onload = function () {
                    deferred.resolve(true);
                };
                image.src = ngSrc;
                return deferred.promise;
            });
        }
    };
});