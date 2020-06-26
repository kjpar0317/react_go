import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import { Container, Col, Row } from 'react-bootstrap';

import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';

import Login from './features/Login';
import DashBoard from './features/DashBoard';
import ImageGrid from './features/ImageGrid';
import { loginSelector } from './features/Login/slice';

export const App = () => {
    const [ loginCheck, setLoginCheck ] = useState(false);
    const { userid, username, token } = useSelector(loginSelector.all);

    const doProcess = () => {
        setLoginCheck(true);
        console.log(loginCheck);
    };

    if (loginCheck || sessionStorage.getItem('token')) {
        if(!sessionStorage.getItem('token')) {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userid', userid);
            sessionStorage.setItem('username', username);
        }

        return (
            <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                        <Sidebar />
                    </Col>
                    <Col xs={10} id="page-content-wrapper">
                        <Row>
                            <Col>
                                <Header />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Route exact path="/" component={DashBoard} />
                                <Route
                                    path="/DashBoard"
                                    component={DashBoard}
                                />
                                <Route
                                    path="/ImageGrid"
                                    component={ImageGrid}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    } else {
        return (
            <div>
                <Login loginFinish={doProcess} />
            </div>
        );
    }
};

export default App;
