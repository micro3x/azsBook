app.factory('user', function ($resource, $http, baseUrl) {
    var resource = $resource(
        baseUrl + '/users/:id',
        {id: '@id'},
        {
            update: {
                method: 'PUT'
            }
        });

    function logout() {
        return resource.save({id: 'logout'}).$promise;
    }


    return {
        logout: logout
    }
});