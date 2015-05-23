app.controller('editUserController', function ($scope, $location, $route, security, infoService, users) {
    $scope.user = {};
    users.getMyFullInfo().then(
        function (success) {
            $scope.user = success;
        },
        function (error) {
            console.log(error);
        }
    );

    $scope.saveProfile = function () {
        users.updateMyInfo($scope.user).then(
            function (success) {
                infoService.success('User Profile Saved');
            },
            function (error) {
                infoService.error('User Profile NOT Changed - ' + error.statusText)
            }
        )
    };

    $scope.avatarChanged = function (element) {
        convertImage(element.files[0],  'profile');
    };

    $scope.backgroundChanged = function (element) {
        convertImage(element.files[0], 'background');
    };

    var convertImage = function (file, image) {
        if (file.type.match(/image\/.*/)) {
            var reader = new FileReader();
            reader.onload = function () {
                if (image == 'profile') {
                    $scope.user.profileImageData = reader.result;
                } else {
                    $scope.user.coverImageData = reader.result;
                }
            };
            reader.readAsDataURL(file);
        } else {
            infoService.warning('File type not supported!');
        }
    };

});
