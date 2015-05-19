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
        baseUrl + '/me/:id',
        {id: '@id'},
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


    return {
        logout: logout,
        getFullUserInfo: getFullUserInfo,
        getMyFullInfo: getMyFullInfo
    }
});