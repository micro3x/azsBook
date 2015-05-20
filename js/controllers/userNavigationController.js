app.controller('userNavigationController', function ($scope, $location, $route, security, infoService, user) {
    $scope.user = {};
    $scope.myStyle = {"background": "white"};
    $scope.searchResults = [];
    $scope.isSearching = false;
    $scope.hasRequests = false;
    $scope.showRequests = false;
    $scope.friendRequests = [];


    user.getMyFullInfo().then(
        function (success) {
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
    }

});