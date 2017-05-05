var jsonRequester = (function() {

    function send(method, url, options) {
        options = options || {};

        let headers = options.headers || {},
            data = options.data || undefined;
        console.log('ajax');
        let promise = new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                method: method,
                contentType: 'application/json',
                headers: headers,
                data: JSON.stringify(data),
                success: function(res) {
                    resolve(res);
                },
                error: function(err) {
                    reject(err);
                }
            });
        });
        return promise;
    }

    function get(url, options) {
        return send('GET', url, options);
    }

    function post(url, options) {
        return send('POST', url, options);
    }

    function put(url, options) {
        return send('PUT', url, options);
    }

    function del(url, options) {
        return send('DELETE', url, options);
    }

    return {
        send,
        get,
        post,
        put,
        del
    };
}());