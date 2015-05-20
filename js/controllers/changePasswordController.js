app.controller('changePasswordController', function ($scope, $location, $route, security, infoService, user) {

    $scope.oldPassword = '';
    $scope.newPassword = '';
    $scope.regNewPassword = '';

    $scope.changePassword = function () {
        user.changeMyPassword(this.oldPassword, this.newPassword, this.regNewPassword).then(
            function (success) {
                infoService.success('Your Password has been changed');
                $location.path('/')
            },
            function (error) {
                infoService.error('Password NOT Changed. Error - ' + error.message);
            }
        )
    };
});