import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Form, Button } from 'react-bootstrap';

import { loginAction } from './slice';

const Login = ({ loginFinish }) => {
    const dispatch = useDispatch();

    const [ validated, setValidated ] = useState(false);
    const [ userid, setUserid ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        setValidated(true);

        await dispatch(loginAction.dologin({userid, password}));

        loginFinish(true);
    };

    return (
        <Card className="text-center">
            <Card.Header>로그인</Card.Header>
            <Card.Body>
                <Form
                    noValidate
                    validated={validated.toString()}
                    onSubmit={handleSubmit}
                >
                    <Form.Group controlId="userid" className="text-left">
                        <Form.Label>아이디</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={userid}
                            onChange={(e) => setUserid(e.target.value)}
                            placeholder="아이디를 입력하세요"
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="formBasicPassword"
                        className="text-left"
                    >
                        <Form.Label>패스워드</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="패스워드를 입력하세요"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
            <Card.Footer className="text-muted">@PKJ</Card.Footer>
        </Card>
    );
};

export default Login;
