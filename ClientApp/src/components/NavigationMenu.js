import React, { useReducer, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { Login } from './Login';
import { LogOut } from './LogOut';
import { LoginContext, ACTION } from './App'




    


export const Navigation = (props) => {
    const { _dispatch } = useContext(LoginContext)


    const onLogout = () => {
        _dispatch({ type: ACTION.LOGOUT })
    }

    const userid = (document.cookie || "userid=")
        .split('; ')
        .find(row => row.startsWith('userid'))
        .split('=')[1];
    
    return (
        <React.Fragment>
            <div>
                {(document.cookie != "") ?
                    <Navbar bg="dark" expand="lg">
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav>
                                <NavLink className="text-white m-2 bg-dark" to='/Get' >GetData</NavLink>
                                <NavLink className="text-white m-2 bg-dark" to='/Add'>AddData</NavLink>
                                <Button type="submit" onClick={onLogout}  className="form-control btn btn-danger">Logout</Button>
                                Welcome {userid}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>

                    : <Login />
                }
            </div>
        </React.Fragment>
    )
}