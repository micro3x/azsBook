app.controller('userNavigationController', function ($scope, $location, $route, security, infoService, user) {
    $scope.user = {};
    $scope.myStyle = {"background": "white"};
    $scope.searchResults = [];
    $scope.isSearching = false;
    $scope.hasRequests = false;
    $scope.showRequests = false;
    $scope.friendRequests = [];
    $scope.username = '';

    user.getMyFullInfo().then(
        function (success) {
            $scope.username = success.username;
            success.coverImageData = $scope.correctImageIfNeeded(success.coverImageData);
            success.profileImageData = $scope.correctImageIfNeeded(success.profileImageData);
            $scope.user = success;
            if (success.coverImageData) {
                $scope.myStyle = {"background-image": "url('" + success.coverImageData + "')"};
            }
            getFriendRequests();
        },
        function (error) {
            console.log(error);
        }
    );

    function getFriendRequests(){
        user.getFriendRequests().then(
            function (success) {
                $scope.hasRequests = success.length > 0;
                $scope.friendRequests = success;
            },
            function (error) {
                infoService.error('can\'t get friends Requests');
            }
        );

    }

    $scope.logout = function () {
        security.clearUserSession();
        user.logout().then(
            function (success) {
                $location.path('/');
                $route.reload();
            },
            function (error) {
                //infoService.error(error.statusText);
                $location.path('/');
                $route.reload();
            }
        );
    };

    $scope.searchUsers = function (element) {
        var queryText = element.value;
        if (queryText) {
            user.searchUsers(queryText).then(
                function (data) {
                    $scope.isSearching = true;
                    $scope.searchResults = data;
                },
                function (error) {
                    infoService.error('error searching');
                }
            )
        } else {
           $scope.clearSearch();
        }
    };

    $scope.clearSearch = function (element) {
        if (!element || !element.value) {
            $scope.isSearching = false;
            $scope.searchResults = [];
            return;
        }
        if (element && !element.value) {
            $scope.isSearching = false;
            $scope.searchResults = [];
        }
    };

    $scope.showFriendRequests = function () {
        $scope.showRequests = !$scope.showRequests;
    };

    $scope.acceptRequest = function (id) {
        user.acceptFriendRequest(id).then(
            function (success) {
                infoService.success('You have a new Friend');
                $route.reload();
            },
            function (error) {
                infoService.error(error.message)
            }
        )
    };

    $scope.rejectRequest = function (id) {
        user.rejectFriendRequest(id).then(
            function (success) {
                infoService.success('You Kicked His ASS!');
                $route.reload();
            },
            function (error) {
                infoService.error(error.message)
            }
        )
    };

    $scope.viewFriends = function () {
        $location.path('/friends');
    };

});