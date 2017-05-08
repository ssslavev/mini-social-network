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
        document.location.reload(true)
            // document.location = '#/login';
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

    }

    function createPost(post) {
        let authToken = localStorage.getItem('signed-in-user-authtoken')

        let headers = {
            "authorization": `Kinvey ${authToken}`
        }

        let url = 'https://baas.kinvey.com/appdata/kid_BJmTNavCl/posts';

        return jsonRequester.post(url, { data: post, headers: headers })

    }

    function getAllPosts() {
        let authToken = localStorage.getItem('signed-in-user-authtoken')

        let headers = {
            "authorization": `Kinvey ${authToken}`
        }

        let url = 'https://baas.kinvey.com/appdata/kid_BJmTNavCl/posts?query={}&sort={"_kmd.ect":-1}';

        return jsonRequester.get(url, { headers: headers })

    }

    function getPostsByUserId(id) {
        let authToken = localStorage.getItem('signed-in-user-authtoken')

        let headers = {
            "authorization": `Kinvey ${authToken}`
        }

        let url = `https://baas.kinvey.com/appdata/kid_BJmTNavCl/posts?query={"_acl.creator":"${id}"}`;

        return jsonRequester.get(url, { headers: headers })

    }

    function getPostsById(id) {
        let authToken = localStorage.getItem('signed-in-user-authtoken')

        let headers = {
            "authorization": `Kinvey ${authToken}`
        }

        let url = `https://baas.kinvey.com/appdata/kid_BJmTNavCl/posts?query={"_id":"${id}"}`;

        return jsonRequester.get(url, { headers: headers })

    }

    function addComment(id, comment) {
        let authToken = localStorage.getItem('signed-in-user-authtoken')

        let headers = {
            "authorization": `Kinvey ${authToken}`
        }

        let post;

        return getPostsById(id).then(function(res) {
                post = res
                console.log(post)
                console.log(post[0].author)

                return post
            })
            .then((post) => {
                let data = {
                    "_id": post[0]._id,
                    "content": post[0].content,
                    "author": post[0].author,
                    "_acl": {
                        "creator": post[0]._acl.creator
                    },
                    "comments": post[0].comments,
                    "_kmd": {
                        "lmt": post[0]._kmd.lmt,
                        "ect": post[0]._kmd.ect
                    }
                }

                data.comments.push({
                    text: comment.text,
                    user: localStorage.getItem('signed-in-user-username'),
                    date: new Date(),
                    authorId: localStorage.getItem('signed-in-user-id')

                })

                let url = `https://baas.kinvey.com/appdata/kid_BJmTNavCl/posts/${id}`;

                return jsonRequester.put(url, { data: data, headers: headers })
            })



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

    function getAllUsers() {
        let authToken = localStorage.getItem('signed-in-user-authtoken')
        let url = 'https://baas.kinvey.com/user/kid_BJmTNavCl'
        let headers = {
            "authorization": `Kinvey ${authToken}`
        }
        return jsonRequester.get(url, { headers: headers })
    }

    function getFriends() {
        let authToken = localStorage.getItem('signed-in-user-authtoken')
        let url = ' https://baas.kinvey.com/appdata/kid_BJmTNavCl/friends'
        let headers = {
            "authorization": `Kinvey ${authToken}`
        }
        return jsonRequester.get(url, { headers: headers })
    }

    function acceptRequest(id) {
        let currId = localStorage.getItem('signed-in-user-id')
        let authToken = localStorage.getItem('signed-in-user-authtoken')
        let url = ' https://baas.kinvey.com/appdata/kid_BJmTNavCl/friends'
        let data = {
            user_one: id,
            user_two: currId
        }

        let headers = {
            "authorization": `Kinvey ${authToken}`
        }
        return jsonRequester.post(url, { headers: headers, data: data })
    }

    function addFriend(id){
        let currId = localStorage.getItem('signed-in-user-id')
        let authToken = localStorage.getItem('signed-in-user-authtoken')
        let url = ' https://baas.kinvey.com/user/kid_BJmTNavCl'
        let data = {
            Friends: id
        }

        let headers = {
            "authorization": `Kinvey ${authToken}`
        }
        return jsonRequester.post(url, { headers: headers, data: data })
    }

    function getFromReq(id) {
        let currId = localStorage.getItem('signed-in-user-id')
        let authToken = localStorage.getItem('signed-in-user-authtoken')
        let url = `https://baas.kinvey.com/appdata/kid_BJmTNavCl/friendReq?query={"from":"${id}", "to":"${currId}"}`
        let headers = {
            "authorization": `Kinvey ${authToken}`
        }
        return jsonRequester.get(url, { headers: headers })
    }

    function getToReq(id) {
        let currId = localStorage.getItem('signed-in-user-id')
        let authToken = localStorage.getItem('signed-in-user-authtoken')
        let url = `https://baas.kinvey.com/appdata/kid_BJmTNavCl/friendReq?query={"from":"${currId}", "to":"${id}"}`
        let headers = {
            "authorization": `Kinvey ${authToken}`
        }
        return jsonRequester.get(url, { headers: headers })
    }

    function sendFriendReq(id) {
        let currId = localStorage.getItem('signed-in-user-id')
        let authToken = localStorage.getItem('signed-in-user-authtoken')
        let url = `https://baas.kinvey.com/appdata/kid_BJmTNavCl/friendReq`
        let headers = {
            "authorization": `Kinvey ${authToken}`
        }

        let data = {
            from: currId,
            to: id
        }

        return jsonRequester.post(url, { headers: headers, data: data })
    }

    function cancelRequest(id) {
        let currId = localStorage.getItem('signed-in-user-id')
        let authToken = localStorage.getItem('signed-in-user-authtoken')
        let url = `https://baas.kinvey.com/appdata/kid_BJmTNavCl/friendReq?query={"from":"${currId}", "to":"${id}"}`
        let headers = {
            "authorization": `Kinvey ${authToken}`
        }
        return jsonRequester.del(url, { headers: headers })
    }

    function deleteRequest(id) {
        let currId = localStorage.getItem('signed-in-user-id')
        let authToken = localStorage.getItem('signed-in-user-authtoken')
        let url = `https://baas.kinvey.com/appdata/kid_BJmTNavCl/friendReq?query={"from":"${id}", "to":"${currId}"}`
        let headers = {
            "authorization": `Kinvey ${authToken}`
        }
        return jsonRequester.del(url, { headers: headers })
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
            getUserById,
            getAllUsers,
            getFriends,
            getFromReq,
            getToReq,
            sendFriendReq,
            cancelRequest,
            deleteRequest,
            acceptRequest
        },
        posts: {
            createPost,
            getAllPosts,
            getPostsByUserId,
            pictureUpload,
            getPicture,
            addComment,
            getPostsById
        }
    }
})();