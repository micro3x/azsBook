var app = angular.module('AzsBook', ['ngRoute', 'ngResource']);

app.constant('baseUrl', 'http://softuni-social-network.azurewebsites.net/api');

app.config(
    function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl : function () {
                var loggedUser = sessionStorage.getItem('loggedUser');
                if(loggedUser) {
                    return 'partials/user/userHome.html';
                }
                return 'partials/pages/guestHome.html';
            },
            controller: 'homeController' //todo determine if user is logged
        });

        $routeProvider.when('/editUser', {
            templateUrl: 'partials/user/editUser.html',
            controller: 'homeController' //todo determine if user is logged
        });

        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }
);