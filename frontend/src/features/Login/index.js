import React from 'react';

const Login = ({ changeLoginState }) => {
    const doLogin = () => {
        changeLoginState(true);
    };

    return <button onClick={doLogin}>로그인</button>;
};

export default Login;
