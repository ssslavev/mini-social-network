data = (function() {

    const USERNAME_STORAGE_KEY = 'signed-in-user-username',
        AUTH_TOKEN_STORAGE_KEY = 'signed-in-user-authtoken',
        USER_ID = 'signed-in-user-id';




    function login(user) {
        let headers = {
            "authorization": "Basic a2lkX0JKbVROYXZDbDo5OTUxNDYyMmVjODA0MTYxYWUzNzNmZjI4MGExODQzOQ=="
        }

        let reqUser = {
            username: user.username,
            password: CryptoJS.SHA1(user.password).toString()
        }

        var url = 'https://baas.kinvey.com/user/kid_BJmTNavCl/login'
        return jsonRequester.post(url, { data: reqUser, headers: headers })
            .then((user) => {
                localStorage.setItem(USERNAME_STORAGE_KEY, user.username);
                localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, user._kmd.authtoken);
                localStorage.setItem(USER_ID, user._id)
                document.location.reload(true);

            })
    }

    function register(user) {
        let headers = {
            "authorization": "Basic a2lkX0JKbVROYXZDbDo5OTUxNDYyMmVjODA0MTYxYWUzNzNmZjI4MGExODQzOQ=="
        }

        let reqUser = {
            username: user.username,
            password: CryptoJS.SHA1(user.password).toString()
        }

        var url = 'https://baas.kinvey.com/user/kid_BJmTNavCl'

        return jsonRequester.post(url, { data: reqUser, headers: headers })

    }

    function logout() {
        localStorage.clear();
        location = '#/';

    }

    function getCurrentuser() {
        let username = localStorage.getItem('signed-in-user-username');
        if (!username) {
            return null;
        }

        return username;
    }


    return {
        users: {
            login,
            register,
            logout,
            getCurrentuser
        }
    }
})();