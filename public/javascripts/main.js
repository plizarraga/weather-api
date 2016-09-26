angular.module('weatherApp', [])
  .controller('WeatherController', function($scope, $http) {
	$scope.cityName = 'Mexicali, Baja California';
	$scope.location = '';
	$scope.foodCategory = 'Sushi';
	$scope.foodCategoryList = ['Sushi', 'Mexican','Italian', 'Fast Food', 'Coffe Shop', 'Japanese'];
	$scope.weatherList = [];

	$scope.getWeather = function(){
		url = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\""+$scope.cityName+"\")&format=json&env=store://datatables.org/alltableswithkeys"
		$http.get(url)
			.success(function(data) {
				console.log(data);
				if(data.query.results){
					var loc = data.query.results.channel.location;
					$scope.location = loc.city + ", " + loc.region + ", " + loc.country;
					// @todo - mostar el clima de 5 dias
				}else{
					console.log('Please enter a valid location');					
				}
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};

	$scope.getRestaurants = function(){
		url = "https://query.yahooapis.com/v1/public/yql?q=select * from local.search where query=\""+$scope.foodCategory+"\" and location=\""+$scope.cityName+"\"&format=json&env=store://datatables.org/alltableswithkeys"
		$http.get(url)
			.success(function(data) {
				console.log(data);
				if(data.query.results){
					// @todo - renderear los restaurantes
				}else{
					console.log("No restaurants found")
				}
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};
  });