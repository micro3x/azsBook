app.controller('friendsPreviewController', function ($scope, $location, $route, security, infoService, user) {
    //$scope.friends = {};

    $scope.getFriends = function () {
        user.getMyFriends().then(
            function (data) {
                $scope.friends = data;
            },
            function (error) {
                infoService.error(error.message);
            }
        );
    };


    $scope.getFriends();


});