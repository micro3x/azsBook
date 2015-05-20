//friendInfoController
app.controller('friendInfoController', function ($scope, $routeParams, $location, $route, security, infoService, user) {
    $scope.friend = {};
    $scope.friendStyle = {};

    var id = $routeParams.username;

    user.getUserFullData(id).then(
        function (success) {
            $scope.friend = success;
            $scope.friendStyle = {"background-image": "url('" + success.coverImageData + "')"};
        },
        function (error) {
            console.log(error);
        }
    );
});