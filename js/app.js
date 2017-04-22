(function() {



    var sammyApp = Sammy('#main', function() {
        var $main = $('#main');

        this.get('#/user/:id', () => {
            $main.html('User profile page');
        });


        this.get('#/', () => {
            document.title = 'Home'
            templates.get('home').then((tmp) => $main.html(tmp))
        });

        this.get('#/about', () => {
            document.title = 'About'
            templates.get('about').then((tmp) => {
                $main.html(tmp)

            })

        });

        this.get('#/register', usersController.register)

        this.get('#/login', usersController.login);



        this.get('#/ads', () => {
            var test;
            document.title = 'Ads'
            $.get('https://forum-telerik.firebaseio.com/test.json')
                .then((res) => {
                    test = res;
                    return templates.get('ads');
                })
                .then((tmpl) => $main.html(tmpl(test)));


        });
    })


    $(() => {
        sammyApp.run('#/')


        var target = $('#main');
        $(document).ajaxStart(function() {
            var spinner = new Spinner().spin()
            target.html(spinner.el)
        });



        if (data.users.getCurrentuser()) {
            $('#register').addClass('hidden');
            $('#login').addClass('hidden');
            $('#loged a').html(data.users.getCurrentuser()).attr('href', '#/user/' + localStorage.getItem('signed-in-user-id'));

        } else {
            $('#logout').addClass('hidden');
        }


        $('#logout').on('click', () => {
            data.users.logout();
        })

    })



})();