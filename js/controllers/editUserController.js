app.controller('editUserController', function ($scope, $location, $route, security, infoService, user) {
    $scope.user = {};
    var userInfo = user.getMyFullInfo().then(
        function (success) {
            $scope.user = success;
            console.log(success);
        },
        function (error) {
            console.log(error);
        }
    );

    $scope.user = userInfo;


});
