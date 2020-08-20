import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

export const Navigation = () => {
    return (
        <React.Fragment>
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <NavLink className="text-white m-2 bg-dark" to='/' >Login</NavLink>
                        <NavLink className="text-white m-2 bg-dark" to='/Get' >GetData</NavLink>
                        <NavLink className="text-white m-2 bg-dark" to='/Add'>AddData</NavLink>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
        </React.Fragment>
        )
}