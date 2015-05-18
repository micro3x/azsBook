app.factory('security', function ($http) {
    function login(username, password){
        //todo implement login

        // todo on success login save user to session
        saveUserSession({username:'', authToken:''});
    }

    function logout(){
        //todo implement logout
    }

    function isUserLogged(){
        var currentUser = sessionStorage.getItem('loggedUser');
        if(!currentUser){
            currentUser = localStorage.getItem('loggedUser');
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
    }

    function getLoggedUser(){
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