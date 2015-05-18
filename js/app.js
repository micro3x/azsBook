var app = angular.module('AzsBook', ['ngRoute']);

app.constant('baseUrl', 'http://softuni-social-network.azurewebsites.net/api');

app.config(
    function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: (function () {
                var loggedUser = sessionStorage.getItem('loggedUser');
                if(loggedUser) {
                    return 'partials/pages/userHome.html';
                }
                return 'partials/pages/guestHome.html';
            })(),
            controller: 'homeController' //todo determine if user is logged
        });

        $routeProvider.when('/home', {
            templateUrl: 'partials/pages/userHome.html',
            controller: 'homeController' //todo determine if user is logged
        });

        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }
);