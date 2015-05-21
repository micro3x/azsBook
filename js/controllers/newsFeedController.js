app.controller('newsFeedController', function ($scope, $location, $route, security, infoService, users) {

    var startPost = '';

    $scope.feedData = {};

    $scope.getNewsFeed = function () {
        users.getNewsFeed().then(
            function (data) {
                $scope.feedData = data;
            },
            function (error) {
                infoService.error(error.message);
            }
        );
    };


    $scope.getNewsFeed();


});