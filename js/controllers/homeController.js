app.controller('homeController', function ($scope, $location, $route, security, infoService, users) {

    $scope.loginUser = '';
    $scope.loginPass = '';
    $scope.regUsername = '';
    $scope.regPassword = '';
    $scope.regRepPassword = '';
    $scope.regEmail = '';
    $scope.regFullName = '';

    $scope.login = function () {
        security.login(this.loginUser, this.loginPass).then(
            function (user) {
                infoService.success('Welcome : ' + user.userName);
                $location.path('/');
                $route.reload();
            },
            function (error) {
                infoService.error(error.error_description);
            }
        );
    };

    $scope.register = function () {
        security.register(
            this.regUsername,
            this.regFullName,
            this.regEmail,
            this.regPassword,
            this.regRepPassword).then(
            function (user) {
                infoService.success('Welcome : ' + user.userName);
                $location.path('/');
                $route.reload();
            },
            function (error) {
                infoService.error(error.message);
            }
        );
    };



});