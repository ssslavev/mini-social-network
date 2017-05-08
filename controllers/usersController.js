let usersController = (function() {

    function register(context) {

        templates.get('register').then((tmp) => {
            context.$element().html(tmp);

            let gender;
            $('#register-submit').on('click', function() {
                if ($('#male').is(':checked')) {
                    gender = $('#male').val()
                } else {
                    gender = $('#female').val()
                }

                let user = {
                    username: $('#register-username').val(),
                    password: $('#register-password').val(),
                    firstName: $('#register-first-name').val(),
                    lastName: $('#register-last-name').val(),
                    email: $('#register-email').val(),
                    gender: gender
                }
                data.users.register(user)
                    .then((user) => {
                        console.log(user);
                        window.setTimeout(function() { location.reload() }, 1500)

                        toastr.success("You are registered! Please, login.")
                    })
            })
        });
    }

    function login(context) {
        if (data.users.getCurrentuser()) {
            context.redirect('#/')
        }

        templates.get('login').then((tmp) => {
            context.$element().html(tmp);
            $('#login-submit').on('click', function() {

                let user = {
                    username: $('#login-username').val(),
                    password: $('#login-password').val(),

                }

                data.users.login(user)
                    .then(() => {
                        toastr.success("You are logged in!")
                        window.setTimeout(function() { location.reload() }, 1500)
                    });
            })
        })
    }

    function getById(context) {
        let fromQuery;
        let toQuery;
        let user;
        let posts;
        let url;
        let friends;
        let id = context.params['id'];

        Promise.all([data.users.getUserById(id),
                data.posts.getPostsByUserId(id),
                data.posts.getPicture(),
                data.users.getFriends(), data.users.getFromReq(id),
                data.users.getToReq(id)
            ])
            .then(([reqUser, reqPosts, reqPicture, reqFriends, fromReq, toReq]) => {
                user = reqUser;
                posts = reqPosts;
                friends = reqFriends;
                fromQuery = fromReq;
                toQuery = toReq;
                //url = reqPicture[0]._downloadURL;
                console.log(url);
                console.log(user);
                console.log(posts);
                console.log(fromQuery);
                console.log(toQuery);

                if (id === localStorage.getItem('signed-in-user-id')) {
                    return templates.get('current-user-page')
                }

                return templates.get('user-details')

            })
            .then((tmpl) => {

                context.$element().html(tmpl({ user, posts, url }))


                //check if friends
                var result = friends.filter(function(obj) {
                    return (obj.user_one === localStorage.getItem('signed-in-user-id') && obj.user_two === id) ||
                        (obj.user_one === id && obj.user_two === localStorage.getItem('signed-in-user-id'));
                });
                if (result.length === 1) {
                    $('#req-btn').attr('value', 'You are friends')
                    $('#accept-btn').hide()
                    $('#ignore-btn').hide()
                    $('#cancel-btn').hide()
                    $('#remove-btn').show()

                } else if (fromQuery.length === 1) {
                    $('#accept-btn').show()
                    $('#ignore-btn').show()
                    $('#req-btn').hide()
                    $('#cancel-btn').hide()
                    $('#remove-btn').hide()

                    $('#accept-btn').on('click', () => {
                        Promise.all([data.users.deleteRequest(), data.users.acceptRequest(id), data.users.addFriend(id)])
                            .then(() => {
                                toastr.success('You are now friends!')
                                window.setTimeout(function() { location.reload() }, 500)
                            })

                    })

                } else if (toQuery.length === 1) {
                    $('#req-btn').attr('value', 'You are friends').hide()
                    $('#accept-btn').hide()
                    $('#ignore-btn').hide()
                    $('#cancel-btn').show()
                    $('#remove-btn').hide()

                    $('#cancel-btn').on('click', () => {
                        data.users.cancelRequest(id)
                            .then(() => {
                                toastr.success('Request was canceled!')
                                window.setTimeout(function() { location.reload() }, 500)

                            })
                    })

                } else {
                    $('#req-btn').attr('value', 'Send friend request')
                    $('#accept-btn').hide()
                    $('#ignore-btn').hide()
                    $('#cancel-btn').hide()
                    $('#remove-btn').hide()

                    $('#req-btn').on('click', () => {
                        data.users.sendFriendReq(id)
                            .then(() => {
                                toastr.success('Friend request was send!')
                                window.setTimeout(function() { location.reload() }, 500)
                            })
                    })
                }

                $("#input-1").fileinput();
                $(".btn-pref .btn").click(function() {
                    $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
                    $(this).removeClass("btn-default").addClass("btn-primary");
                });

                $('#avatar').on('click', () => {
                    $('#myModal').modal('show');
                })

                $('.fileinput-upload').on('click', () => {
                    let file = $('#input-1')[0].files[0];


                    let metadata = {
                        "_filename": file.name,
                        "size": file.size,
                        "mimeType": file.type,
                        "picture-type": "avatar",
                        "_public": true
                    }

                    data.posts.pictureUpload(metadata, file)
                        .then((picture) => {
                            location.reload(true)

                        })
                })
            })
    }

    return {
        register,
        login,
        getById
    }
})();