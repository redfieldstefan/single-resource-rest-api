'use strict';

module.exports = function(app) {
	app.controller('rantsController', ['$scope', 'RESTResource', 'copy', function($scope, resource, copy) {
		var Rant = resource('rants');
		$scope.errors = [];
		$scope.rants = [];
		
		$scope.getAll = function() {
			Rant.getAll(function(err, data) {
				if (err) return $scope.errors.push({msg: 'error retrieving rants'});
				$scope.rants = data;
			})
		};

		$scope.createNewRant = function(rant) {
			var newRant = copy(rant);
			rant.title = '';
			rant.rant = '';
			Rant.create(newRant, function(err, data) {
				if (err) {
					return $scope.errors.push({msg: 'error retrieving rants'});
				}
				$scope.rants.push(newRant);
				$scope.rants.splice($scope.rants.indexOf(newRant), 1, data);
			});
		};

		$scope.removeRant = function(rant) {
			$scope.rants.splice($scope.rants.indexOf(rant), 1);
			Rant.remove(rant, function(err) {
				 if(err) {
          			$scope.errors.push({msg: 'could not remove rant: ' + rant.title});
       			 }
			});
		};

		$scope.saveRant = function(rant) {
			rant.editing = false;
			Rant.save(rant, function(err) {
				if(err) {
					$scope.errors.push({msg: 'Could not save this rant: ' + rant.title});
				}
			});
		};

		$scope.reset = function() {
			$scope.rantForm.$rollbackViewValue();
		}

		$scope.clearErrors = function() {
			$scope.errors = [];
		};
	}]);
};