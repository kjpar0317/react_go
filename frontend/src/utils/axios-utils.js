import axios from 'axios'
import Swal from 'sweetalert2';

const axioUtils = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URI}`,
    // timeout: 30000
});

function responseValidate(error) {
    const config = error.config;

    if (!error.response) {
        Swal.fire(
            "network fail",
            "네트워크 연결 오류",
            'error'
        );
        return "network fail";
    }

    // 토큰 재발급 처리
    if (sessionStorage.getItem('token') && error.response.status === 401) {
        return axios.post(`${config.baseURL}/auth/token`, {
                username: sessionStorage.getItem('userid'),
                access_token : sessionStorage.getItem('token')
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        ).then(res => {
            console.log(res.data.resultMsg);
            sessionStorage.setItem('token', res.data.resultData);
            return;
        }).catch(error => {
            return error.response;
        });
    } else {
        Swal.fire(
            error.response.data.error,
            error.response.data.message,
            'error'
        );

        if (error.response.data) {
            return error.response.data
        }

        if (error.response) {
            return error.response.status;
        }
    }
}

// axioUtils.interceptors.request.use(function (config) {
//     const token = sessionStorage.getItem('token');

//     if(token) {
//         config.headers['Authorization'] = 'Bearer ' + token;
//     }
//     config.headers['Content-Type'] = 'application/json';

//     // you can also do other modification in config
//     return config;
// }, function (error) {
//     Swal.fire(
//         "axios request failed",
//         "axios 요청 에러",
//         'error'
//     );
//     return Promise.reject(error);
// });

// axioUtils.interceptors.response.use(function (response) {
//     return response;
// }, function (error) {
//     console.log('response');
//     console.log(error.response);
//     return Promise.reject(responseValidate(error));
// });

axioUtils.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');

        if(token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['Content-Type'] = 'application/json';

        return config;
    },
    (error) => {
        Swal.fire(
            "axios request failed",
            "axios 요청 에러",
            'error'
        );
        return Promise.reject(error);
    }
);

axioUtils.interceptors.response.use(
    (response) => {return response},
    (error) => {
        return Promise.reject(responseValidate(error));
    }
);

export default axioUtils;
