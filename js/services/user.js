app.factory('user', function ($resource, $http, baseUrl) {
    var resourceUsers = $resource(
        baseUrl + '/users/:id',
        {id: '@id'},
        {
            update: {
                method: 'PUT'
            }
        });

    var resourceMe = $resource(
        baseUrl + '/me/:params',
        {params: '@param'},
        {
            update: {
                method: 'PUT'
            }
        });

    function logout() {
        return resourceUsers.save({id: 'logout'}).$promise;
    }

    function getFullUserInfo(username) {
        return resourceUsers.get({id: username}).$promise;
    }

    function getMyFullInfo() {
        return resourceMe.get().$promise;
    }

    function updateMyInfo(user) {
        return resourceMe.update({params: ''}, user).$promise;
    }

    function getNewsFeed(fromPost, size) {
        var count = size || 5;
        var startPost = fromPost || '';
        return resourceMe.query({params: 'feed?StartPostId=' + startPost + '&PageSize=' + count}).$promise;
    }

    function previewUser(username) {
        return resourceUsers.get({id: username + '/preview'})
    }

    function getUserFullData(username) {
        return resourceUsers.get({id: username})
    }

    function searchUsers(query) {
        return resourceUsers.get({id: 'search?searchTerm=' + query})
    }

    function getFriendWallPage(user, fromPost, size) {
        var count = size || 5;
        var startPost = fromPost || '';
        return resourceUsers.query({id: user + '/wall?StartPostId=' + startPost + '&PageSize=' + count}).$promise;
    }

    function getFriendFriends() {
        return resourceUsers.get({id: username + '/friends'})
    }

    function getFriendFriendsPreview() {
        return resourceUsers.get({id: username + '/friends/preview'})
    }

    return {
        logout: logout,
        getFullUserInfo: getFullUserInfo,
        getMyFullInfo: getMyFullInfo,
        updateMyInfo: updateMyInfo,
        getNewsFeed: getNewsFeed,
        previewUser: previewUser,
        getUserFullData: getUserFullData,
        searchUsers: searchUsers,
        getFriendWallPage: getFriendWallPage,
        getFriendFriends: getFriendFriends,
        getFriendFriendsPreview: getFriendFriendsPreview
    }
});