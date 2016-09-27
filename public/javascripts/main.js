angular.module('weatherApp', [])
.controller('WeatherController', function($scope, $http) {

	$scope.init = function(){
		$scope.cityName = 'San Diego, CA';
		$scope.location = '';
		$scope.foodCategoryList = ['Sushi', 'Mexican','Italian', 'Fast Food', 'Coffe Shop', 'Japanese'];
		$scope.selecetdCategory = 'Sushi';
		$scope.weatherList = [];
		$scope.restaurantsList = [];
		$scope.getWeather();
	};

	$scope.getWeather = function(){
		url = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\""+$scope.cityName+"\")&format=json&env=store://datatables.org/alltableswithkeys"
		$http.get(url)
		.success(function(data) {
			// console.log(data);
			if(data.query.results){
				var loc = data.query.results.channel.location;
				$scope.location = loc.city + ", " + loc.region + ", " + loc.country;
				$scope.weatherList = getWeatherItems(data.query.results.channel.item.forecast);
				$scope.restaurantsList = [];
				}else{
					$scope.location = ''
					$scope.restaurantsList = [];
					console.log('Please enter a valid location');					
				}
			})
		.error(function(data) {
			console.log('Error:' + data);
		});
	};

	$scope.getRestaurants = function(categoria){
		url = "https://query.yahooapis.com/v1/public/yql?q=select * from local.search where query=\""+categoria+"\" and location=\""+$scope.cityName+"\"&format=json&env=store://datatables.org/alltableswithkeys"
		$http.get(url)
		.success(function(data) {
			// console.log(data);
			if(data.query.results){
				$scope.restaurantsList = getRestaurantstems(data.query.results.Result);
				}else{
					$scope.restaurantsList = [];
					console.log("No restaurants found")
				}
			})
		.error(function(data) {
			console.log('Error:' + data);
		});
	};

	function getWeatherItems(data){
		var list = [];
		for (var i = 0; i < 5; i++) {
			// console.log(data[i]);
			list.push(data[i]);
		}
		return list;
	};
	function getRestaurantstems(data){
		var list = [];
		for (var i = 0; i < 5; i++) {
			console.log(data[i]);
			list.push(data[i]);
		}
		return list;
	}
});