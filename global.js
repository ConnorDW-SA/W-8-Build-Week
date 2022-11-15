const request = {
    get: (url) => {
        return new Promise((resolve, reject) => {
            fetch(url, { ...opts })
                .then((res) => res.json())
                .then(resolve)
                .catch(reject);
        });
    },
    post: (url, data) => {
        return new Promise((resolve, reject) => {
            fetch(url, {
                headers: {
                    ...opts.headers,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then(resolve)
                .catch(reject);
        });
    },
    put: (url, data) => {
        return new Promise((resolve, reject) => {
            fetch(url, {
                headers: {
                    ...opts.headers,
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then(resolve)
                .catch(reject);
        });
    },
    delete: (url) => {
        return new Promise((resolve, reject) => {
            fetch(url, {
                ...opts,
                method: "DELETE",
            })
                .then((res) => res.json())
                .then(resolve)
                .catch(reject);
        });
    },
};

//Added helper functions to make using Fetch easier
