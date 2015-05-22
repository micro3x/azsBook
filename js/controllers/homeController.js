app.controller('homeController', function ($scope, $location, $route, security, infoService, users) {

    if (security.isUserLogged()) {
        security.saveUserSession(security.getLoggedUser());
    }

    $scope.loginUser = '';
    $scope.loginPass = '';

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

    $scope.regUsername = '';
    $scope.regPassword = '';
    $scope.regRepPassword = '';
    $scope.regEmail = '';
    $scope.regFullName = '';

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


    $scope.correctImageIfNeeded = function (imageData) {
        if (imageData) {
            if (imageData.match(/data:image\/.*/)) {
                return imageData;
            }
            return 'data:image/jpeg;base64,' + imageData;
        }
    }

    $scope.formatDate = function (dateString) {
        var date = new Date(dateString);
        return $.format.date(date, "dd/MM/yyyy HH:mm:ss");
    }
});