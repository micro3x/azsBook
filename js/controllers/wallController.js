app.controller('wallController', function ($scope, posts, $routeParams, $location, $route, security, infoService, user) {

    var startPost = '';

    $scope.wallData = [];
    var username = $routeParams.username;

    $scope.getWallPage = function () {
        posts.getFriendWallPage(username).then(
            function (success) {
                $scope.wallData = success;
            },
            function (error) {
                alert('No');
            }
        )
    };

    $scope.likePost = function (postId) {
        posts.likePost(postId).then(
            function () {
                infoService.success('Post Liked');
            },
            function (error) {
                infoService.error(error.message);
            }
        )
    };

    $scope.unLikePost = function (postId) {
        posts.unLikePost(postId).then(
            function () {
                infoService.success('Post NOT Liked anymore');
            },
            function (error) {
                infoService.error(error.message);
            }
        )
    };

    $scope.likeComment = function (postId, commentId) {
        posts.likeComment(postId, commentId).then(
            function () {
                infoService.success('Comment Liked');
            },
            function (error) {
                infoService.error(error.message);
            }
        )
    };

    $scope.unLikeComment = function (postId, commentId) {
        posts.unLikeComment(postId, commentId).then(
            function () {
                infoService.success('Comment NOT Liked anymore');
            },
            function (error) {
                infoService.error(error.message);
            }
        )
    };


    $scope.getWallPage();


});