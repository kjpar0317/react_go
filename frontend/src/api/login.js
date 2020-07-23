import axioUtils from 'utils/axios-utils';

const doLogin = (username, password) => {
    return axioUtils.post('/login', {
        'userid': username,
        'password': password
    }).then(res => {
        sessionStorage.setItem('userid', username);
        return res.data;
    });
};

export { doLogin };
