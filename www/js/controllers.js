var app = angular.module('simplytravel.controllers', []);

app.controller("SimplyController", function ($scope, SimplyService) {
	$scope.simply = SimplyService;
});