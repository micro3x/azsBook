app.controller('wallController', function ($scope, posts, $routeParams, $location, $route, security, infoService, user) {

    var startPost = '';

    $scope.wallData = [];
    var username = $routeParams.username;

    $scope.getWallPage = function () {
        posts.getFriendWallPage(username).then(
            function (success) {
                $scope.wallData = success;
            },
            function (error) {
                alert('No');
            }
        )
    };



    $scope.getWallPage();


});