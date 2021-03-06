app.factory('posts', function ($resource, $http, baseUrl) {
    var resourceUsers = $resource(
        baseUrl + '/users/:id:params',
        {id: '@id', params: '@params'},
        {
            update: {
                method: 'PUT'
            }
        });

    var resourcePost = $resource(
        baseUrl + '/Posts:params',
        {params: '@param'},
        {
            update: {
                method: 'PUT'
            }
        });

    function getFriendWallPage(username, pageSize, startPost) {
        var size = pageSize || 5;
        var start = startPost || '';
        return resourceUsers.query({
            id: username,
            params: '/wall?StartPostId=' + start + '&PageSize=' + size
        }, {}).$promise;
    }

    function likePost(id) {
        return resourcePost.save({params: '/' + id + '/likes'}, {}).$promise;
    }

    function unLikePost(id) {
        return resourcePost.remove({params: '/' + id + '/likes'}, {}).$promise;
    }

    function likeComment(postId, id) {
        return resourcePost.save({params: '/' + postId + '/comments/' + id + '/likes'}, {}).$promise;
    }

    function unLikeComment(postId, id) {
        return resourcePost.remove({params: '/' + postId + '/comments/' + id + '/likes'}, {}).$promise;
    }

    function getPostComments(postId) {
        return resourcePost.query({params: '/' + postId + '/comments'}).$promise;
    }

    function newComment(postId, commentContent) {
        return resourcePost.save({params: '/' + postId + '/comments'}, {commentContent: commentContent}).$promise;
    }

    function deletePost(postId) {
        return resourcePost.remove({params: '/' + postId}).$promise;
    }

    function editPost(postId, postContent) {
        return resourcePost.update({params: '/' + postId}, {postContent: postContent}).$promise;
    }

    function newPost(username, text) {
        return resourcePost.save({params: ''}, {username: username, postContent: text}).$promise;
    }

    function deleteComment(postId, commentId) {
        return resourcePost.remove({params: '/' + postId + '/comments/' + commentId}, {}).$promise;
    }

    function editComment(postId, commentId, commentText) {
        return resourcePost.update({params: '/' + postId + '/comments/' + commentId}, {commentContent: commentText}).$promise;
    }

    return {
        getFriendWallPage: getFriendWallPage,
        likePost: likePost,
        unLikePost: unLikePost,
        likeComment: likeComment,
        unLikeComment: unLikeComment,
        getPostComments: getPostComments,
        newComment: newComment,
        deletePost: deletePost,
        editPost: editPost,
        newPost: newPost,
        deleteComment: deleteComment,
        editComment: editComment
    }

});