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
                        document.location.reload(true);
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

                data.users.login(user);


            })
        })
    }

    function getById(context) {
        let user;
        let posts;
        let url;
        let friends;
        let id = context.params['id'];

        Promise.all([data.users.getUserById(id),
                data.posts.getPostsByUserId(id),
                data.posts.getPicture(),
                data.users.getFriends()
            ])
            .then(([reqUser, reqPosts, reqPicture, reqFriends]) => {
                user = reqUser;
                posts = reqPosts;
                friends = reqFriends;
                url = reqPicture[0]._downloadURL;
                console.log(url);
                console.log(user);
                console.log(posts);




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