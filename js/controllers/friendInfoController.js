app.controller('friendInfoController', function ($scope, $routeParams, $location, $route, security, infoService, users) {
    $scope.friend = {};
    $scope.friendStyle = {};
    var id = $routeParams.username;
    $scope.username = id;

    users.getUserFullData(id).then(
        function (success) {
            success.coverImageData = $scope.correctImageIfNeeded(success.coverImageData);
            success.profileImageData = $scope.correctImageIfNeeded(success.profileImageData);
            $scope.friend = success;

            if (success.coverImageData) {
                $scope.friendStyle = {"background-image": "url('" + success.coverImageData + "')"};
            }

        },
        function (error) {
            console.log(error);
        }
    );

    $scope.viewFriends = function () {
        $location.path('/user/'+ id +'/friends');
    };
});