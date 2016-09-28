angular.module('weatherApp', [])
.controller('WeatherController', function($scope, $http) {
	var url_api = "http://localhost/api";
	
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
		var city = $scope.cityName.toLowerCase();
		$http.get(url_api+`/weather/${city}`)
		.success(function(data) {
			if(data.query.results){
				var loc = data.query.results.channel.location;
				$scope.location = loc.city + ", " + loc.region + ", " + loc.country;
				$scope.weatherList = getItems(data.query.results.channel.item.forecast);
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
		var category = categoria.toLowerCase();
		var city = $scope.cityName.toLowerCase();
		$http.get(url_api+`/restaurants/${city}/${category}`)
		.success(function(data) {
			if(data.query.results){
				$scope.restaurantsList = getItems(data.query.results.Result);
				}else{
					$scope.restaurantsList = [];
					console.log("No restaurants found")
				}
			})
		.error(function(data) {
			console.log('Error:' + data);
		});
	};

	function getItems(data){
		var list = [];
		for (var i = 0; i < 5; i++) {
			list.push(data[i]);
		}
		return list;
	};
});