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
                console.log(error);
            }
        )
    };

    $scope.likePost = function (post) {
        posts.likePost(post.id).then(
            function () {
                infoService.success('Post Liked');
                post.liked = !post.liked;
                post.likesCount = post.likesCount + 1;
            },
            function (error) {
                infoService.error(error.message);
            }
        )
    };

    $scope.unLikePost = function (post) {
        posts.unLikePost(post.id).then(
            function () {
                infoService.success('Post NOT Liked anymore');
                post.liked = !post.liked;
                post.likesCount = post.likesCount - 1;
            },
            function (error) {
                infoService.error(error.message);
            }
        )
    };

    $scope.likeComment = function (postId, comment) {
        posts.likeComment(postId, comment.id).then(
            function () {
                infoService.success('Comment Liked');
                comment.liked = !comment.liked;
                comment.likesCount = comment.likesCount + 1;
            },
            function (error) {
                infoService.error(error.message);
            }
        )
    };

    $scope.unLikeComment = function (postId, comment) {
        posts.unLikeComment(postId, comment.id).then(
            function () {
                infoService.success('Comment NOT Liked anymore');
                comment.liked = !comment.liked;
                comment.likesCount = comment.likesCount - 1;
            },
            function (error) {
                infoService.error(error.message);
            }
        )
    };

    $scope.getPostComments = function (post) {
        posts.getPostComments(post.id).then(
            function (success) {
                post.comments = success;
            },
            function (error) {
                infoService.error('can\'t get post comments for post id: ' + postId);
            }
        )
    };

    $scope.commentPost = function (post, commentText) {
        posts.newComment(post.id, commentText).then(
            function (success) {
                post.comments.push(success);
            },
            function (error) {
                infoService.error(error.message);
            }
        )
    };

    $scope.getWallPage();


});