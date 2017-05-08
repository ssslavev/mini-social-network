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
                        comments: []
                    }

                    data.posts.createPost(post)
                        .then((post) => {
                            console.log(post);
                            window.setTimeout(function() { location.reload() }, 1500)
                            toastr.success('Post was created!')
                        })

                })

                $('.btn-comment').on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    let id = $(this).parents('#post-container').attr('data-id')
                    let text = $(this).parents('.input-group').children('.comment-input').val()

                    let comment = {
                        text: text,
                        username: localStorage.getItem('')
                    }

                    data.posts.addComment(id, comment)
                        .then((res) => {
                            console.log(res)
                            window.setTimeout(function() { location.reload() }, 1500)
                            toastr.success('Comment was added!')
                        })
                })
            })
    }

    return {
        all
    }
})();