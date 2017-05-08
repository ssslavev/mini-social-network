let requestsController = (function() {

    function all(context) {

        let usersArray = []
        data.users.getAllRequests()
            .then((req) => {
                usersArray = req

                console.log(usersArray)
                return templates.get('requests')
            })
            .then((tmpl) => {

                context.$element().html((tmpl(usersArray)))
                console.log(usersArray)
            })
    }

    return {
        all
    }

})();