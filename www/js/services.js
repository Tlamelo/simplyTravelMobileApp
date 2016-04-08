var app = angular.module('simplytravel.services', []);

app.service("SimplyService", function ($q, $http, md5) {
	var self = {
		'page': 1,
		'isLoading': false,
		'hasMore': true,
		'results': [],
		'lat': 51.544440,
		'lon': -0.022974,
		'refresh': function () {
			self.page = 1;
			self.isLoading = false;
			self.hasMore = true;
			self.results = [];
			return self.load();
		},
		'next': function () {
			self.page += 1;
			return self.load();
		},
		'load': function () {
			self.isLoading = true;
			var deferred = $q.defer();

			var params = {
				page: self.page,
				lat: self.lat,
				lon: self.lon
			};

			var apiKey = '3c9ab61ub6ne8kfjg91mos7kbo';
			var secret = '7rap22atrokko';
			var ts = Math.floor(Date.now() / 1000); // 1427233130 (Tue, 24 Mar 2015 21:38:50 +0000)
			var sig = md5.createHash(apiKey + secret + ts);
			console.log(sig);
			console.log(ts);
			var ip = "168.167.113.26";
			var userAgent = 'Mozilla/5.0';
			var eanAPI = "http://api.ean.com/ean-services/rs/hotel/v3/list?cid=389950&apiKey=3c9ab61ub6ne8kfjg91mos7kbo&sig=" + sig + "&minorRev=99&customerUserAgent=" + userAgent + "&customerIpAddress=" + ip + "&locale=en_US&currencyCode=USD&city=Seattle&stateProvinceCode=WA&countryCode=US&&hotelId=201252";
			$http.get(eanAPI)
				.success(function (data) {
					self.isLoading = false;
					console.log(data);

					//if (data.businesses.length == 0) {
					//	self.hasMore = false;
					//} else {
					//	angular.forEach(data.businesses, function (business) {
					//		self.results.push(business);
					//	});
					//}

					deferred.resolve();
				})
				.error(function (data, status, headers, config) {
					self.isLoading = false;
					deferred.reject(data);
				});

			return deferred.promise;
		}
	};

	self.load();

	return self;
});