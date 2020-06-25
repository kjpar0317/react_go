import React from 'react';
import { useHistory } from "react-router-dom";

import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
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
            <FontAwesomeIcon icon="coffee"/>

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
                    <FontAwesomeIcon icon={faSignOutAlt} className="highlight" onClick={doLogout} title="로그아웃"/>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
