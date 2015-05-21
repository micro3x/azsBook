app.directive('flyBox', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/user/userFlyBox.html',
        scope: {
            info: "=",
            viewstyle: "=",
            invite: "="
        }
    };
});