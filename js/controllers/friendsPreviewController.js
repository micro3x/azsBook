app.controller('friendsPreviewController', function ($scope, $location, $route, $routeParams, security, infoService, user) {
    $scope.friends = [];
    var currentUser = $routeParams.username;

    $scope.getFriends = function (username) {
        var getFriends = user.getMyFriends;
        if(username){
            getFriends = user.getFriendFriends;
        }

        getFriends(username).then(
            function (data) {
                $scope.friends = data;
            },
            function (error) {
                infoService.error(error.message);
            }
        );
    };

    $scope.getFriends(currentUser);
});