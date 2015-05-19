app.controller('editUserController', function ($scope, $location, $route, security, infoService, user) {
    $scope.user = {};
    user.getMyFullInfo().then(
        function (success) {
            $scope.user = success;
        },
        function (error) {
            console.log(error);
        }
    );


    $scope.profileImage = '';
    $scope.backImage = '';

    $scope.saveProfile = function () {
        if ($scope.profileImage) {
            this.user.profileImageData = $scope.profileImage;
        }
        if ($scope.backImage) {
            this.user.coverImageData = $scope.backImage;
        }
        user.updateMyInfo(this.user).then(
            function (success) {
                infoService.success('User Profile Saved')
                $route.reload();
            },
            function (error) {
                infoService.error('User Profile NOT Changed - ' + error.statusText)
            }
        )
    };

    $scope.avatarChanged = function (element) {
        convertImage(element.files[0], 'profile');
    };

    $scope.backgroundChanged = function (element) {
        convertImage(element.files[0], 'background');
    };

    var convertImage = function (file, image) {
        if (file.type.match(/image\/.*/)) {
            var reader = new FileReader();
            reader.onload = function () {
                if (image == 'profile') {
                    $scope.profileImage = reader.result;
                } else {
                    $scope.backImage = reader.result;
                }
            };
            reader.readAsDataURL(file);
        } else {
            infoService.warning('File type not supported!');
        }
    };

});
