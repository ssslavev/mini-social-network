(function() {

    var sammyApp = Sammy('#main', function() {
        var $main = $('#main');

        this.get('#/user/:id', usersController.getById);

        this.get('#/', homeController.all);

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

        $(document).ajaxStop(function() {
            $(".spinner").remove();

        });

        if (data.users.getCurrentuser()) {
            $('#register').addClass('hidden');
            $('#login').addClass('hidden');
            $('#loged a').html(data.users.getCurrentuser()).attr('href', '#/user/' + localStorage.getItem('signed-in-user-id'));

        } else {
            location = '#/login'
            $('#logout').addClass('hidden');
        }

        $('#logout').on('click', () => {
            data.users.logout();
        })
    })
    
})();