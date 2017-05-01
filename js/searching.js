$("#search-input").on("click", function(ev) {
    let result;
    data.users.getAllUsers()
        .then(users => {
            console.log(users);
            result = users.map(function(a) { return a.username; })
            console.log(result)

            $(ev.target).autocomplete({
                source: result,

            });
        });

});