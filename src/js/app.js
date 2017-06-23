var fedTest = angular.module('fedTest', []);

fedTest.controller('mainController', ['$scope', '$http', function($scope, $http) {

    // Display Movie List
    $http({
        method: "GET",
        url: "js/data/data.json"
    }).then(function mySuccess(response) {
        $scope.movies = response.data.media;
    }, function myError(response) {
        $scope.movies = response.statusText;
    });

    //Chuck Norris Quotes!
    $scope.jokes = [];
    var obj = {};
    $.getJSON('https://api.icndb.com/jokes/random?escape=javascript', function(data) {
        obj.joke = data.value.joke;
        $scope.jokes.push(obj);
        $scope.$apply();
    });

    $scope.giveMeChuck = function() {
        $scope.jokes = [];
        obj = {};
        $.getJSON('https://api.icndb.com/jokes/random?escape=javascript', function(data) {
            obj.joke = data.value.joke;
            $scope.jokes.push(obj);
            $scope.$apply();
        });
    }

    $scope.testimonialContent = 'You and I are very much alike. Archaeology is our religion, yet we have both fallen from the pure faith. Our methods have not differed as much as you pretend. I am but a shadowy reflection of you. It would take only a nudge to make you like me. To push you out of the light. What a fitting end to your life’s pursuits.';
    $scope.testimonialName = 'Indiana Jones, Archaeologist';
    $scope.toggleGenres = function() {
        $('#genreChecklist').slideToggle();
    }
    $scope.toggleYears = function() {
        $('#yearChecklist').slideToggle();
    }
}])


fedTest.controller('genreController', ['$scope', function($scope) {


    $.getJSON('js/data/data.json', function(data) {
        // make an array concatenating all genres
        var genreArray = data.media.reduce(function(result, val) {

            return result.concat(val.genre);
        }, []);

        // remove duplicates
        genreArray = genreArray.filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        });
        // sort the array
        genreArray.sort();
        // bind to the scope
        $scope.genres = genreArray;

    });


}])

fedTest.controller('yearController', ['$scope', function($scope) {


    $.getJSON('js/data/data.json', function(data) {

        // make an array concatenating all Years
        var yearArray = data.media.reduce(function(result, val) {

            return result.concat(val.year);
        }, []);

        // remove duplicates
        yearArray = yearArray.filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        });
        // sort the array
        yearArray.sort();
        // bind to the scope
        $scope.years = yearArray;

    });


}])