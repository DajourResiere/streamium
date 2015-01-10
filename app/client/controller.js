'use strict';

angular.module('streamium.client.controller', ['ngRoute'])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/join/:streamId', {
      templateUrl: 'client/join.html',
      controller: 'JoinStreamCtrl'
    });

    $routeProvider.when('/stream/:streamId', {
      templateUrl: 'client/stream.html',
      controller: 'WatchStreamCtrl'
    });

    $routeProvider.when('/stream/:streamId/cashout', {
      templateUrl: 'client/cashout.html',
      controller: 'WithdrawStreamCtrl'
    });
  }
])

.controller('JoinStreamCtrl', function($scope, $routeParams, StreamiumClient, Insight) {
  $scope.client = StreamiumClient;
  $scope.minutes = [5, 10, 30];

  $scope.stream = {};
  $scope.stream.minutes = $scope.minutes[0];
  $scope.stream.founds = 0;

  StreamiumClient.connect($routeParams.streamId, function(err, fundingAddress) {
    if (err) throw err;

    console.log('DONE send funds at', fundingAddress);
    $scope.fundingAddress = fundingAddress;

    Insight.pollBalance(fundingAddress, function(err, balance) {
      console.log('Balance!', balance);
    });
    $scope.$apply();
  });
})

.controller('WatchStreamCtrl', function($routeParams) {
  console.log('Watch Stream', $routeParams);
})

.controller('WithdrawStreamCtrl', function($routeParams) {
  console.log('Cashout stream', $routeParams);
});