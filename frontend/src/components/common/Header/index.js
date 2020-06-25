import React from 'react';
import { useHistory } from "react-router-dom";

import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
// import './styles.css';

const Header = () => {
    let history = useHistory();

    const doLogout = () => {
        sessionStorage.clear();

        // history.push("/");
        history.go("/");
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">React Study</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Form inline>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                    />
                    <Button variant="outline-success">Search</Button>
                    &nbsp;
                    <small><a onClick={doLogout}>logout</a></small>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
