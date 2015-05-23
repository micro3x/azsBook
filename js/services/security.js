app.factory('security', function ($http, $q, $location, baseUrl, users) {
    function login(username, password) {
        var deffer = $q.defer();
        $http.post(baseUrl + '/users/login', {
            username: username,
            password: password
        }).success(function (data) {
            saveUserSession({username: data.userName, authToken: data.access_token});
            deffer.resolve(data);
        }).error(function (error) {
            deffer.reject(error);
        });
        return deffer.promise;
    }

    function clearUserSession() {
        $http.defaults.headers.common['Authorization'] = '';
        sessionStorage.removeItem('loggedUser');
    }

    function isUserLogged() {
        var currentUser = getLoggedUser();
        if (!currentUser) {
            return false;
        }
        //validateUserToken();
        return true;
    }

    function register(username, fullName, email, password, repeatedPass) {

        var deffer = $q.defer();
        $http.post(baseUrl + '/users/register', {
            username: username,
            password: password,
            confirmPassword: repeatedPass,
            name: fullName,
            email: email
        }).success(function (data) {
            saveUserSession({username: data.userName, authToken: data.access_token});
            deffer.resolve(data);
        }).error(function (error) {
            deffer.reject(error);
        });
        return deffer.promise;
    }

    function getLoggedUser() {
        var strUser = sessionStorage.getItem('loggedUser');
        if (strUser) {
            return JSON.parse(strUser);
        }
    }

    function rememberUser(user) {
        //todo remember user in Local storage, save user and pass if tocken is not working
    }

    function saveUserSession(user) {
        if ($http.defaults.headers.common['Authorization'] == 'Bearer ' + user.authToken) {
            return;
        }
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + user.authToken;
        sessionStorage.setItem('loggedUser', JSON.stringify(user));
    }

    function validateUserToken() {
        $http({method: 'GET', url: baseUrl + '/me', head: ''})
            .success(function (success) {
            })
            .error(function (error) {
                console.log(error);
                clearUserSession();
                $location.path('/');
            })
    }

    return {
        login: login,
        clearUserSession: clearUserSession,
        register: register,
        isUserLogged: isUserLogged,
        getLoggedUser: getLoggedUser,
        rememberUser: rememberUser,
        saveUserSession: saveUserSession,
        validateUserToken: validateUserToken
    }
});