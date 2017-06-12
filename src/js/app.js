var fedTest = angular.module('fedTest', []);

fedTest.controller('mainController', ['$scope', '$http', function($scope, $http) {
    //Testimonials
    $scope.testimonialContent = 'You and I are very much alike. Archaeology is our religion, yet we have both fallen from the pure faith. Our methods have not differed as much as you pretend. I am but a shadowy reflection of you. It would take only a nudge to make you like me. To push you out of the light. What a fitting end to your life’s pursuits.';
    $scope.testimonialName = 'Indiana Jones, Archaeologist';

    //Chuck Norris Quotes!
    $scope.jokes = [];
    var obj = {};
    $.getJSON('https://api.icndb.com/jokes/random?escape=javascript', function(data) {
        obj.joke = data.value.joke;
        $scope.jokes.push(obj);
        $scope.$apply();
    });
    $('.cta-btn').on('click', function() {
        $scope.jokes = [];
        obj = {};
        $.getJSON('https://api.icndb.com/jokes/random?escape=javascript', function(data) {
            obj.joke = data.value.joke;
            $scope.jokes.push(obj);
            $scope.$apply();
        });
    });

    // $http.get('js/data/data.json').success(function(data) {
    //     $scope.movies = data;
    //     console.log(data);
    // });

}]);