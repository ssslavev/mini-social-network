let homeController = (function() {

    function all(context) {
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
                            document.location.reload(true);
                        })

                })
            })
    }

    return {
        all
    }
})();