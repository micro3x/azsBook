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
        return resourceUsers.get({id: username + '/preview'}).$promise;
    }

    function getUserFullData(username) {
        return resourceUsers.get({id: username}).$promise;
    }

    function searchUsers(query) {
        return resourceUsers.query({id: 'search?searchTerm=' + query}).$promise;
    }

    function getFriendWallPage(user, fromPost, size) {
        var count = size || 5;
        var startPost = fromPost || '';
        return resourceUsers.query({id: user + '/wall?StartPostId=' + startPost + '&PageSize=' + count}).$promise;
    }

    function getFriendFriends() {
        return resourceUsers.get({id: username + '/friends'}).$promise;
    }

    function getFriendFriendsPreview() {
        return resourceUsers.get({id: username + '/friends/preview'}).$promise;
    }

    function getMyFriends() {
        return resourceMe.query({params: 'friends'}).$promise;
    }

    function changeMyPassword(old, newPass, repNewPass) {
        return resourceMe.update({params: 'changepassword'}, {
            oldPassword: old,
            newPassword: newPass,
            confirmPassword: repNewPass
        }).$promise;
    }

    //http://softuni-social-network.azurewebsites.net/api/me/requests/John
    function sendFriendRequest(user){
        return resourceMe.save({params: 'requests/' + user},{}).$promise;
    }

    function getFriendRequests(){
        return resourceMe.query({params: 'requests'},{}).$promise;
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
        getFriendFriendsPreview: getFriendFriendsPreview,
        getMyFriends: getMyFriends,
        changeMyPassword: changeMyPassword,
        sendFriendRequest: sendFriendRequest,
        getFriendRequests:getFriendRequests
    }
});