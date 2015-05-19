app.controller('newsFeedController', function ($scope, $location, $route, security, infoService, user) {

    var startPost = '';

    $scope.feedData = {};

    $scope.getNewsFeed = function () {
        user.getNewsFeed().then(
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