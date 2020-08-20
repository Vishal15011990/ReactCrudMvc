import React, { useState, useReducer } from 'react'
import { Card, Form } from 'react-bootstrap'
import { type } from 'jquery';
import './formvalidation.css'
import  axios  from 'axios'

export const Login = (props) => {
    const [employee, setEmployee] = useState({ UserName: '', EmailId: '' });

    const changeHandle = (e) => {
        e.persist();
        setEmployee({ ...employee, [e.target.name]: e.target.value })
    }


    const initialState = {
        _UserName:'',
        _EmailId:''
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
                    _emailerror=null;
                }

            default:
                return {
                    state
                }
        }
    }


    const [error, dispatch] = useReducer(reducer, initialState)

    const url = "http://localhost:59447/api/EmployeeMasters/Login";
    const isLogin = (e) => {
        debugger;
        e.preventDefault();
        const data = {
            Name: employee.UserName,
            EmailId: employee.EmailId
        }
        
        axios.post(url, data)
            .then(res => {
                if (res.data === false) {
                    props.history.push('/')
                }
                else {
                    props.history.push('/Get');
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
        </React.Fragment>
    )
}