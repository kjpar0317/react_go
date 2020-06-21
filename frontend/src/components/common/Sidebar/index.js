import React from 'react';
import { Link } from 'react-router-dom';

import { Nav } from 'react-bootstrap';

import './styles.css';

const Sidebar = () => {
    return (
        <Nav className="col-md-12 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky"></div>
            <Nav.Item>
                <Nav.Link as={Link} to="/DashBoard">
                    대시보드
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/ImageGrid">
                    이미지그리드
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default Sidebar;
