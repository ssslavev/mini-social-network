let homeController = (function() {

    function all(context) {

        if (!localStorage.getItem('signed-in-user-username')) {
            context.redirect('#/login')
        }

        let posts;

        data.posts.getAllPosts()
            .then((resPosts) => {
                posts = resPosts;
                console.log(posts)

                return templates.get('home')
            })
            .then((tmpl) => {
                context.$element().html(tmpl(posts))

                $('#post-submit').on('click', function() {

                    let post = {
                        content: $('#status_message').val(),
                        author: localStorage.getItem('signed-in-user-username'),
                    }

                    data.posts.createPost(post)
                        .then((post) => {
                            console.log(post);
                            window.setTimeout(function() { location.reload() }, 1500)
                            toastr.success('Post was created!')
                        })

                })
            })
    }

    return {
        all
    }
})();