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
			});
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
			Rant.save(rant, function(err, data) {
				if(err) {
					$scope.errors.push({msg: 'Could not save this rant: ' + rant.title});
				}
			});
		};

		$scope.startEdit=function(rant) {
			rant.editing = true;
			rant.titleBackup = rant.title;
			rant.rantBackup = rant.rant;
		};

		$scope.revert = function(rant) {
			if(rant.editing){
				rant.title= rant.titleBackup;
				rant.rant = rant.rantBackup;
				rant.titleBackup = undefined;
				rant.rantBackup = undefined;
				rant.editing = false;
			} else {
				rant.titleBackup = rant.title;
				rant.rantBackup = rant.rant;
				rant.editing = true;
			}
		};

		$scope.reset = function() {
			document.getElementById("rantForm").reset();
		};

		$scope.clearErrors = function() {
			$scope.errors = [];
		};
	}]);
};