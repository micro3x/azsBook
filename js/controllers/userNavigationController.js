app.controller('userNavigationController', function ($scope, $location, $route, security, infoService, user) {
    $scope.user = {};
    $scope.myStyle = {"background": "white"};

    $scope.searchResults = [];
    $scope.isSearching = false;

    user.getMyFullInfo().then(
        function (success) {
            $scope.user = success;
            $scope.myStyle = {"background-image": "url('" + $scope.user.coverImageData + "')"};
        },
        function (error) {
            console.log(error);
        }
    );

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
    }


});