var app = angular.module('AzsBook', ['ngRoute']);
app.config(
    function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/pages/guestHome.html',
            controller: 'homeController' //todo determine if user is logged
        });

        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }
);