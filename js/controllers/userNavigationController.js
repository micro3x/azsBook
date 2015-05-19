app.controller('userNavigationController', function ($scope, $location, $route, security, infoService, user) {
    $scope.user = {};
    $scope.myStyle = {"background-image":"url('"+ $scope.user.coverImageData +"')"};

    user.getMyFullInfo().then(
        function (success) {
            $scope.user = success;
            $scope.myStyle = {"background-image":"url('"+ $scope.user.coverImageData +"')"};
        },
        function (error) {
            console.log(error);
        }
    );
});