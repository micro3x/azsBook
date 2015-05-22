app.controller('wallController', function ($scope, posts, $routeParams, $location, $route, security, infoService, users) {

    var mouse = {x: 0, y: 0};

    document.addEventListener('mousemove', function (e) {
        mouse.x = e.clientX || e.pageX;
        mouse.y = e.clientY || e.pageY
    }, false);

    var startPost = '';

    $scope.wallData = [];
    var username = $routeParams.username;
    $scope.editMode = false;
    $scope.popStyle = {display: 'none', 'z-index': '10000'};

    $scope.getWallPage = function () {
        posts.getFriendWallPage(username, null, startPost).then(
            function (data) {
                if(data.length > 0) {
                    $scope.wallData = $scope.wallData.concat(data);
                    startPost = data[data.length - 1].id;
                }
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
                infoService.error(error.data.message);
            }
        )
    };

    $scope.deleteComment = function (post, comment) {
        posts.deleteComment(post.id, comment.id).then(
            function (success) {
                post.comments = post.comments.filter(function (d) {
                    if (d == comment) {
                        return false;
                    }
                    return true;
                })
            },
            function (error) {
                infoService.error(error.data.message);
            }
        );
    };

    $scope.canEditPost = function (post) {
        if (post.author.username == $scope.user.username) {
            return true;
        }
        if (post.wallOwner.username == $scope.user.username) {
            return true;
        }
        return false;
    };

    $scope.canEditComment = function (comment, post) {
        if (comment.author.username == $scope.user.username) {
            return true;
        }
        if (post.wallOwner.username == $scope.user.username) {
            return true;
        }
        return false;
    };

    $scope.deletePost = function (post) {
        posts.deletePost(post.id).then(
            function (success) {
                $scope.wallData = $scope.wallData.filter(function (d) {
                    if (d == post) {
                        return false;
                    }
                    return true;
                })
            },
            function (error) {
                infoService.error(error.data.message);
            }
        );
    };

    $scope.newPost = function (postContent) {
        posts.newPost(username, postContent).then(
            function (success) {
                $scope.wallData.unshift(success);
            },
            function (error) {
                infoService.error(error.data.message);
            }
        )

    };

    $scope.editPost = function (post) {
        posts.editPost(post.id, post.postContent).then(
            function (success) {
                infoService.success('Post Updated');
            },
            function (error) {
                infoService.error(error.data.message);
            }
        )
    };

    $scope.flyInfo = {};
    $scope.popStyle = {display: 'none', 'z-index': '10000'};

    $scope.showPopup = function (user) {
        $scope.flyInfo = user;
        $scope.flyInfo.pupUp = true;
        $scope.popStyle.display = 'block';
        $scope.popStyle.position = 'fixed';
        $scope.popStyle.top = (mouse.y - 20) + 'px';
        $scope.popStyle.left = (mouse.x - 20) + 'px';
        $scope.popStyle.background = 'white';
        $scope.popStyle.border = '1px solid black';
        $scope.popStyle.padding = '10px';
    };

    $scope.hidePopup = function (user) {
        $scope.flyInfo.pupUp = false;
    };

    if (username) {
        $scope.getWallPage();
        $(window).scroll(function () {

            var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();
            var scrolltrigger = 1;

            if ((wintop / (docheight - winheight)) == scrolltrigger) {
                $scope.getWallPage();
                console.log('Getting next')
            }
        });
    }
});