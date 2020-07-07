const getDashboardLayouts = () => {
    return fetch(
        `${process.env.REACT_APP_BASE_URI}/api/dashboard/layout/list`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        },
    )
        .then((res) => res.json())
        .catch((err) => {
            throw err;
        });
};

export { getDashboardLayouts };
