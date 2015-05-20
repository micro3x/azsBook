app.controller('friendsPreviewController', function ($scope, $location, $route, security, infoService, user) {
    $scope.friends = [];

    $scope.getFriends = function (username) {
        var getFriends = user.getMyFriends;
        if(username){
            getFriends = user.getFriendFriends;
        }

        getFriends().then(
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