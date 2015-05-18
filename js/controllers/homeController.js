app.controller('homeController', function ($scope, $location, $route, security, infoService) {

    $scope.loginUser = '';
    $scope.loginPass = '';

    $scope.login = function () {
        security.login(this.loginUser, this.loginPass).then(
            function (user) {
                infoService.success('Welcome : ' + user.userName);
                $location.path('/');
                window.location.reload(false);
            },
            function (error) {
                infoService.error(error.error_description);
            }
        );
    };


});