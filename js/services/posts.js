app.factory('posts', function ($resource, $http, baseUrl) {
    var resourceUsers = $resource(
        baseUrl + '/users/:id:params',
        {id: '@id', params: '@params'},
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

// http://softuni-social-network.azurewebsites.net/api/users/John/wall?StartPostId=&PageSize=5

    function getFriendWallPage(username, pageSize, startPost) {
        var size = pageSize || 5;
        var start = startPost || '';
        return resourceUsers.query({
            id: username,
            params: '/wall?StartPostId=' + start + '&PageSize=' + size
        }, {}).$promise;
    }

    return {
        getFriendWallPage: getFriendWallPage,

    }

});