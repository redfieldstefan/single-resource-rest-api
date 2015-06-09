'use strict';

module.exports = function(app) {
	app.controller('authController', ['$scope', '$location', 'auth', function($scope, $location, auth){
		$scope.errors = [];
		$scope.authSubmit = function(user) {
			if(user.password_confirmation){
				auth.create(user, function(err){
					if(err){
						console.log(err);
						return $scope.errors.push({msg: 'could not sign in'});
					}
					$location.path('/rants');
				});
			} else {
				auth.signIn(user, function(err){
					if(err){
						console.log(err);
						$scope.errors.push({msg: 'could not sign in'});
					}
					$location.path('/rants');
				});
			}
		};	
	}]);
};

