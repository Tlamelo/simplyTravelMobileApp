var app = angular.module('simplytravel.filters', []);

app.filter("join", function () {
	return function (arr, sep) {
		return arr.join(sep);
	};
});