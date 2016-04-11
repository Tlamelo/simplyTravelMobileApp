var app = angular.module('simplytravel.services', []);

app.service("SimplyService", function ($q, $http, md5,$ionicPlatform, $cordovaGeolocation, $ionicPopup) {
	var self = {
		'page': 1,
		'isLoading': false,
		'hasMore': true,
		'results':[],
		'lat': 51.544440,
		'lon': -0.022974,
		'refresh': function () {
			//self.page = 1;
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
            
            $ionicPlatform.ready(function () {
                
                
				var posOptions = {
					timeout: 10000,
					enableHighAccuracy: true
				};
				$cordovaGeolocation
					.getCurrentPosition(posOptions)
					.then(function (position) {
						self.lat = position.coords.latitude
						self.lon = position.coords.longitude
						console.log(self.lat, self.lon);       
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
			var eanAPI = "http://api.ean.com/ean-services/rs/hotel/v3/list?cid=389950&apiKey=3c9ab61ub6ne8kfjg91mos7kbo&sig="+sig+"&minorRev=99&customerUserAgent="+userAgent+"&customerIpAddress="+ip+"&locale=en_US&currencyCode=USD&city=Gaborone";
			$http.get(eanAPI)
				.success(function (data) {
					self.isLoading = false;
                    console.log(data);
					/*console.log(data.HotelListResponse.HotelList.HotelSummary);*/

					if (data.HotelListResponse.EanWsError != null) {
                        console.log(data.HotelListResponse.EanWsError.presentationMessage);
						self.hasMore = false;
					} else {
                        
                       var hotels=data.HotelListResponse.HotelList.HotelSummary;
                        console.log(hotels[0].name);
                       	angular.forEach(hotels, function (hotel) {
							self.results.push(hotel);
                            console.log(self.results);
						});
					}

					deferred.resolve();
				})
				.error(function (data, status, headers, config) {
					self.isLoading = false;
					deferred.reject(data);
				});
                }, function (err) {
						// error
						console.error("Error getting position");
						console.error(err);
						$ionicPopup.alert({
							'title': 'Please switch on geolocation',
							'template': "It seems like you've switched off geolocation for caffeinehit"
						});
					});
                
                
            });			

			return deferred.promise;
		}
	};

	self.load();

	return self;
});