(function () {

  'use strict';

  angular.module('WordcountApp', [])

  .config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
  })

  .controller('WordcountController', ['$scope', '$log', '$http', '$timeout',
    function($scope, $log, $http, $timeout) {

      $scope.submitButtonText = "Submit";
      $scope.loading = false;
      $scope.urlerror = false;
    $scope.getResults = function() {
      $log.log("test");

      var userInput = $scope.url;

      $http.post('/start', {"url":userInput}).
      success(function(results) {
        $log.log(results);
        getWordCount(results);
        $scope.wordcounts = null;
        $scope.loading = true;
        $scope.urlerror = false;
        $scope.submitButtonText = 'Loading......';
      }).
      error(function(error) {
        $log.log(error);
        $scope.urlerror = true;
        $scope.loading = false;
        $scope.submitButtonText = 'Submit';
      });


        function getWordCount(jobId){
            var timeout = ""

            var poller = function(){
              $http.get('/results/'+jobId).
              success(function(data, status, headers, config) {
                if (status == 202){
                  $log.log(data, status);
                } else if (status == 200){
                  $log.log(data);
                  $scope.loading = false;
                  $scope.submitButtonText = 'Submit';
                  $scope.wordcounts = data;
                  $timeout.cancel(timeout);
                  return false;
                }

                timeout = $timeout(poller, 2000);
              });
            };
            poller();
          }

    };
  }

  ])
  .directive('wordCountChart', ['$parse', function($sparse){
    return {
      restrict: 'E',
      replace: true,
      template: '<div id="chart"></div>',
      link: function(scope) {
        scope.$watch('wordcounts', function(){
          d3.select('#chart').selectAll('*').remove();
          var data = scope.wordcounts;
          for (var word in data){
            d3.select('#chart')
            .append('div')
            .selectAll('div')
            .data(word[0])
            .enter()
            .append('div')
            .style('width', function(){
              return (data[word] * 20) + 'px';
            })
            .text(function(d){
              return word;
            });
          }

        }, true);
      }
    };
  }
]);

}());
