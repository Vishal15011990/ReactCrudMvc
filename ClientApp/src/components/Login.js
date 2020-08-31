import React, { useState, useReducer, useContext } from 'react'
import { Card, Form } from 'react-bootstrap'
import { type } from 'jquery';
import './formvalidation.css'
import axios from 'axios'
import { LoginContext, ACTION } from './App'



export const name = "isAuth";
export const Login = (props) => {

    const [employee, setEmployee] = useState({ UserName: '', EmailId: '' });

    const changeHandle = (e) => {
        e.persist();
        setEmployee({ ...employee, [e.target.name]: e.target.value })
    }



    // const [isAuth, setAuth] = useState(null)
    const initialState = {
        _UserName: '',
        _EmailId: '',
    }

    const reducer = (state, action) => {
        let _usererror, _emailerror;
        switch (action.type) {
            case ('_userName'):
                if (employee.UserName === "") {
                    _usererror = "User-Name required"
                    return {
                        _usererror
                    }
                }
                else {
                    _usererror = null;
                }
            case ('_emailId'):
                let regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
                if (employee.EmailId === "" || !regex.test(employee.EmailId)) {
                    _emailerror = "Email-Id required"
                    return {
                        _emailerror
                    }
                }

                else {
                    _emailerror = null;
                }

            default:
                return {
                    state
                }
        }
    }

    const updateCookie = () => {
        document.cookie = "userid=" + employee.UserName;
    }

    const deleteCookie = () => {
        document.cookie = "userid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }



    const [error, dispatch] = useReducer(reducer, initialState)

    const { _dispatch } = useContext(LoginContext)

    const url = "http://localhost:59447/api/EmployeeMasters/Login";
    const isLogin = (e) => {
        e.preventDefault();
        const data = {
            Name: employee.UserName,
            EmailId: employee.EmailId
        }

        axios.post(url, data)
            .then(res => {
                if (res.data === false) {
                    deleteCookie();
                }
                else {
                    updateCookie();
                    //props.incCounter()
                    _dispatch({type: ACTION.LOGIN })
                }
            })
    }



    return (
        <React.Fragment>
            <Card className="mt-4 responsive">
                <Card.Header className="bg-dark text-white">
                    Welcome to Login Page
                </Card.Header>
            </Card>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <Form className="_form" onSubmit={isLogin}>
                            <Form.Row className="form-group frm1">
                                <label className="col-md-4">Username:</label>
                                <input type="text" className="form-control col-md-10" placeholder="Name" name="UserName" onChange={changeHandle}
                                    onFocus={() => dispatch({ type: '_userName' })} />
                                <span className="lblUsername">{error._usererror}</span>
                            </Form.Row>
                            <Form.Row className="form-group frm1">
                                <label className="col-md-4">Password:</label>
                                <input type="text" className="form-control col-md-10" placeholder="Email-Id" name="EmailId" onChange={changeHandle}
                                    onFocus={() => dispatch({ type: '_emailId' })} />
                                <span className="lblEmailid">{error._emailerror}</span>
                            </Form.Row>
                            <input type="submit" className="btn btn-primary form-control" value="Login" />
                        </Form>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}