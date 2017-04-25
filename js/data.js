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
            password: CryptoJS.SHA1(user.password).toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender
        }

        var url = 'https://baas.kinvey.com/user/kid_BJmTNavCl'

        return jsonRequester.post(url, { data: reqUser, headers: headers })

    }

    function logout() {
        localStorage.clear();
        document.location = '#/';

    }

    function getCurrentuser() {
        let username = localStorage.getItem('signed-in-user-username');
        if (!username) {
            return null;
        }

        return username;
    }

    function getUserById(id) {
        let authToken = localStorage.getItem('signed-in-user-authtoken')


        let headers = {
            "authorization": `Kinvey ${authToken}`
        }

        let url = `https://baas.kinvey.com/user/kid_BJmTNavCl/${id}`;

        return jsonRequester.get(url, { headers: headers })
        l
    }

    function createPost(post) {
        let authToken = localStorage.getItem('signed-in-user-authtoken')


        let headers = {
            "authorization": `Kinvey ${authToken}`
        }

        let url = 'https://baas.kinvey.com/appdata/kid_BJmTNavCl/posts';

        return jsonRequester.post(url, { data: post, headers: headers })
        l

    }

    function getAllPosts() {
        let authToken = localStorage.getItem('signed-in-user-authtoken')


        let headers = {
            "authorization": `Kinvey ${authToken}`
        }

        let url = 'https://baas.kinvey.com/appdata/kid_BJmTNavCl/posts';

        return jsonRequester.get(url, { headers: headers })
        l

    }

    function getPostsByUserId(id) {
        let authToken = localStorage.getItem('signed-in-user-authtoken')


        let headers = {
            "authorization": `Kinvey ${authToken}`
        }

        let url = `https://baas.kinvey.com/appdata/kid_BJmTNavCl/posts?query={"_acl.creator":"${id}"}`;

        return jsonRequester.get(url, { headers: headers })
    }

    function pictureUpload(data, file) {
        let authToken = localStorage.getItem('signed-in-user-authtoken')


        let headers = {
            "authorization": `Kinvey ${authToken}`,
            "Content-type": 'application/json',
            "X-Kinvey-Content-Type": data.mimeType
        }

        let url = `https://baas.kinvey.com/blob/kid_BJmTNavCl/`;

        let promise = new Promise((resolve, reject) => {
            $.ajax({
                    method: 'POST',
                    url: url,
                    headers: headers,
                    data: JSON.stringify(data),
                })
                .then((success) => {

                    let innerHeaders = success._requiredHeaders;
                    innerHeaders['Content-Type'] = file.type
                    let uploadUrl = success._uploadURL;
                    let id = success._id;

                    $.ajax({
                            method: 'PUT',
                            url: uploadUrl,
                            headers: innerHeaders,
                            processData: false,
                            data: file

                        })
                        .then((success) => {
                            resolve(success);
                        })
                        .catch((error) => {
                            reject(error);
                        })
                })
        })

        return promise;

    }

    function getPicture() {
        let authToken = localStorage.getItem('signed-in-user-authtoken')
        let id = localStorage.getItem('signed-in-user-id')
        let url = `https://baas.kinvey.com/blob/kid_BJmTNavCl?query={"_acl.creator":"${id}"}`;

        let headers = {
            "authorization": `Kinvey ${authToken}`
        }

        return jsonRequester.get(url, { headers: headers })

    }

    return {
        users: {
            login,
            register,
            logout,
            getCurrentuser,
            getUserById

        },
        posts: {
            createPost,
            getAllPosts,
            getPostsByUserId,
            pictureUpload,
            getPicture
        }
    }
})();