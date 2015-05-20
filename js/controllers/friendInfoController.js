//friendInfoController
app.controller('friendInfoController', function ($scope, $routeParams, $location, $route, security, infoService, user) {
    $scope.friend = {};
    $scope.friendStyle = {};

    var id = $routeParams.username;

    user.getUserFullData(id).then(
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

    $scope.inviteAsFriend = function () {
        user.sendFriendRequest($scope.friend.username).then(
            function (success) {
                infoService.success('Friend Request Sent!')
                $route.reload();
            },
            function (error) {
                infoService.error('Friend Request Not Sent!')
            }
        )
    }

});