let requestsController = (function() {

    function all(context) {

        let usersArray = []
        data.users.getAllRequests()
            .then((req) => {
                usersArray = req

                return templates.get('requests')
            })
            .then((tmpl) => {

                context.$element().html((tmpl(usersArray)))
            })
    }

    return {
        all
    }

})();