'use strict';

module.exports = function(app) {
	app.controller('rantsController', ['$scope', '$http', function($scope, $http) {
		$scope.errors = [];
		$scope.rants = [];
		$scope.getAll = function() {
			$http.get('/api/rants')
				.success(function(data){
					$scope.rants = data;
				})
				.error(function(data){
					console.log(data);
					$scope.errors.push({msg: 'error retrieving rants'});
				});
		};
		$scope.createNewRant = function() {
			$http.post('/api/rants', $scope.newRant)
				.success(function(data) {
					$scope.rants.push(data);
					$scope.newRant = null;
				})
				.error(function(data) {
					console.log(data);
					$scope.errors.push({msg: 'could not create new Rant'});
				});
		};

		$scope.removeRant = function(rant) {
			$scope.rants.splice($scope.rants.indexOf(rant), 1);
			$http.delete('/api/rants/' + rant._id)
				.error(function(data) {
					console.log(data);
					$scope.errors.push({msg:'could not remove rant: ' + rant.rant});
				});
		};

		$scope.saveRant = function(rant) {
			rant.editing = false;
			$http.put('/api/rants/' + rant._id, rant)
				.error(function(data) {
					console.log(data);
					$scope.errors.push({msg: 'Could not Save Rant'});
				});
		};

		$scope.clearErrors = function() {
			$scope.errors = [];
		};
	}]);
};
