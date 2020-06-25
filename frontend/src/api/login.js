const doLogin = (userid, password) => {
    return fetch(
        `${process.env.REACT_APP_BASE_URI}/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                'userid': userid,
                'password': password
            })
        }
    )
        .then((res) => res.json())
        .catch((err) => {
            throw err;
        });
};

export { doLogin };
