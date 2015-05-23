app.controller('baseController', function ($scope, $location, $route, security, infoService, users) {
    if (security.isUserLogged()) {
        security.saveUserSession(security.getLoggedUser());
    } else {
        $location.path('/');
        $route.reload();
    }

    $scope.correctImageIfNeeded = function (imageData) {
        if (imageData) {
            if (imageData.match(/data:image\/.*/)) {
                return imageData;
            }
            return 'data:image/jpeg;base64,' + imageData;
        }
    };

    $scope.formatDate = function (dateString) {
        var date = new Date(dateString);
        return $.format.date(date, "dd/MM/yyyy HH:mm:ss");
    };

    $scope.inviteAsFriend = function (user) {
        users.sendFriendRequest(user.username).then(
            function (success) {
                infoService.success('Friend Request Sent!');
                user.hasPendingRequest = true;
            },
            function (error) {
                infoService.error('Friend Request Not Sent!')
            }
        )
    };

});