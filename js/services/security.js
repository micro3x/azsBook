app.factory('security', function ($http, $q, baseUrl) {
    function login(username, password){
        var deffer = $q.defer();
        $http.post(baseUrl + '/users/login', {
            username: username,
            password: password
        }).success(function (data) {
            saveUserSession({username:data.userName, authToken:data.access_token});
            deffer.resolve(data);
        }).error(function (error) {
            deffer.reject(error);
        });
        return deffer.promise;
    }

    function logout(){
        //todo implement logout
    }

    function isUserLogged(){
        var currentUser = getLoggedUser();
        if(!currentUser){
            currentUser = JSON.parse(localStorage.getItem('loggedUser'));
            if(currentUser){
                login(currentUser.username, currentUser.password);
                return true;
            }
            return false;
        }
        return true;
        // todo validate token - get info about me. :)
    }

    function register(username, fullName, email, password, repeatedPass){
        // todo implement registration
        var deffer = $q.defer();
        $http.post(baseUrl + '/users/register', {
            username: username,
            password: password,
            confirmPassword: repeatedPass,
            name: fullName,
            email: email
        }).success(function (data) {
            saveUserSession({username:data.userName, authToken:data.access_token});
            deffer.resolve(data);
        }).error(function (error) {
            deffer.reject(error);
        });
        return deffer.promise;
    }

    function getLoggedUser(){
        var strUser = sessionStorage.getItem('loggedUser');
        if(strUser){
            return JSON.parse(strUser);
        }
        // todo read from session storage
    }

    function rememberUser(user){
        //todo remember user in Local storage, save user and pass if tocken is not working
    }

    function saveUserSession(user){
        sessionStorage.setItem('loggedUser', JSON.stringify(user));
    }

    return {
        login: login,
        logout:logout,
        register: register,
        isUserLogged: isUserLogged,
        getLoggedUser: getLoggedUser,
        rememberUser: rememberUser


    }
});