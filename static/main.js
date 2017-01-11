(function () {

  'use strict';

  angular.module('WordcountApp', [])

  .config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
  })

  .controller('WordcountController', ['$scope', '$log',
    function($scope, $log) {
    $scope.getResults = function() {
      $log.log("test");
    };
  }

  ]);

}());
