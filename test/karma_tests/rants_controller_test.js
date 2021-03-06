'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('rants controller test', function() {
	var $CtrlrConstructor;
	var $httpBackend;
	var $scope;

	beforeEach(angular.mock.module('rantsApp'));

	beforeEach(angular.mock.inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
		$CtrlrConstructor = $controller;
	}));

	it('should be able to create a new controller', function() {
		var rantsController = $CtrlrConstructor('rantsController', {$scope: $scope});
		expect(typeof rantsController).toBe('object');
		expect(Array.isArray($scope.rants)).toBe(true);
		expect(Array.isArray($scope.errors)).toBe(true);
		expect(typeof $scope.getAll).toBe('function');
	});

	describe('REST functionality', function() {
		beforeEach(angular.mock.inject(function(_$httpBackend_) {
			this.rantsController = $CtrlrConstructor('rantsController', {$scope: $scope});
			$httpBackend = _$httpBackend_;
		}));

		afterEach(function() {
     		$httpBackend.verifyNoOutstandingExpectation();
      		$httpBackend.verifyNoOutstandingRequest();
    	});

		it('should make a get request on index', function() {
			$httpBackend.expectGET('/api/rants')
				.respond(200,[{_id: 1, title: 'Test Title', rant: 'Test Rant'}]);
			$scope.getAll();
			$httpBackend.flush();
			expect($scope.rants[0].title).toBe('Test Title');
			expect($scope.rants[0].rant).toBe('Test Rant');
			expect($scope.rants[0]._id).toBe(1);

		});

		it('should correctly handle errors', function() {
			$httpBackend.expectGET('/api/rants').respond(500, {msg: 'server error'});
			$scope.getAll();
			$httpBackend.flush();
			expect($scope.errors.length).toBe(1);
			expect($scope.errors[0].msg).toBe('error retrieving rants');
		});

		it('should save a new Rant', function(){
			$httpBackend.expectPOST('/api/rants').respond(200, {_id: 2, title: 'TEST', rant: 'TEST RANT'});
			$scope.createNewRant();
			$httpBackend.flush();
			expect($scope.rants[0].title).toBe('TEST');
			expect($scope.rants[0].rant).toBe('TEST RANT');
			expect($scope.rants[0]._id).toBe(2);
		});

		it('should delete a rant', function() {
			var rant = {_id: 3, title: 'TESTING', rant:'TESTNG RANT'};
			$scope.rants.push(rant);
			$httpBackend.expectDELETE('/api/rants/3').respond(200, {msg: 'success!'});
			expect($scope.rants.indexOf(rant)).not.toBe(-1);
			$scope.removeRant(rant);
			expect($scope.rants.indexOf(rant)).toBe(-1);
			$httpBackend.flush();
		});

		it('should delete a rant even on server error', function() {
			var rant = {_id: 4, title: 'TESTING', rant:'TESTNG RANT'};
			$scope.rants.push(rant);
			$httpBackend.expectDELETE('/api/rants/4').respond(500, {msg: 'wahwah!'});
			expect($scope.rants.indexOf(rant)).not.toBe(-1);
			$scope.removeRant(rant);
			expect($scope.rants.indexOf(rant)).toBe(-1);
			$httpBackend.flush();
		});
	});

});