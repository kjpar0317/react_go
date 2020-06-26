const doTest = () => {
    return fetch(
        `${process.env.REACT_APP_BASE_URI}/api/test`,
        {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        }
    )
        .then((res) => res.text())
        .catch((err) => {
            throw err;
        });
};

export { doTest };
