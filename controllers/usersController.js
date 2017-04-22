let usersController = (function() {

    function register(context) {

        templates.get('register').then((tmp) => {
            context.$element().html(tmp);
            $('#register-submit').on('click', function() {
                let user = {
                    username: $('#register-username').val(),
                    password: $('#register-password').val(),
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

    return {
        register,
        login
    }
})();