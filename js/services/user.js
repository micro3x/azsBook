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

    function updateInfo(user) {
        return resourceMe.update({params: ''}, user).$promise;
    }

    function getNewsFeed(fromPost, size) {
        var count = size || 5;
        var startPost = fromPost || '';
        return resourceMe.query({params: 'feed?StartPostId=' + startPost + '&PageSize=' + count}).$promise;
    }


    return {
        logout: logout,
        getFullUserInfo: getFullUserInfo,
        getMyFullInfo: getMyFullInfo,
        updateInfo: updateInfo,
        getNewsFeed: getNewsFeed,
    }
});