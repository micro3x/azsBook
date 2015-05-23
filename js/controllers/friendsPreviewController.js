app.controller('friendsPreviewController', function ($scope, $location, $route, $routeParams, security, infoService, users) {
    $scope.friends = [];
    var currentUser = $routeParams.username;

    $scope.getFriends = function (username) {
        var getFriends = users.getMyFriends;
        if (username) {
            getFriends = users.getFriendFriends;
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

    $scope.searchFriendString = '';

    $scope.searchCompare = function (actual) {
        var regex = new RegExp('.*' + $scope.searchFriendString + '.*', 'i');
        if(actual.name.match(regex)){
            return true;
        }
        return false;
    };
});