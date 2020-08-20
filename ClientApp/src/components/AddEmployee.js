import React, { useState, useEffect, useContext, useReducer } from 'react';
import { Form, FormGroup, Col } from 'react-bootstrap';
import axios from 'axios';
import { store } from 'react-notifications-component'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import $, { error, type } from 'jquery'
import './formvalidation.css'
import { Card, Table, Button } from 'react-bootstrap';
import { ErrorContext } from './CustomError'




export const AddEmployee = (props) => {

    const [employee, setemployee] = useState({ Name: '', Phone: '', EmailId: '', Address: '', Country: '', State: '', City: '' });
    const changeHandle = (e) => {
        e.persist();
        setemployee({ ...employee, [e.target.name]: e.target.value });

    }

    const [selectedDate, setSelectedDate] = useState();
    const changeHandle2 = date => setSelectedDate(date);

    //const [nameerrors, setErrors] = useState(false);
    //const [phoneerrors, setError2] = useState(false);
    //const [emailerrors, setError3] = useState(false);
    //const [addresserrors, setError4] = useState(false);
    //const [countryerrors, setError5] = useState(false);
    //const [stateerrors, setError6] = useState(false);
    //const [cityerrors, setError7] = useState(false);


    const initialState = {
        Name: '',
        Phone: '',
        EmailId: '',
        Address: '',
        Country: '',
        State: '',
        City: ''
    }

    const reducer = (state, action) => {
        let _nameerror, _phoneerror, _adderror, _countryerror, _emailerror, _stateerror, _cityerror
        
        switch (action.type) {
            case '_Name':
                if (employee.Name === "") {
                    _nameerror = "Name Required";
                    return { _nameerror }
                }
                else {
                    _nameerror = null;
                }
            case '_Phone':
                if (employee.Phone === "") {
                    _phoneerror = "Phone Required";
                    return {  _phoneerror }
                }
                else {
                    _phoneerror = null;
                }
            case '_EmailId':
                let regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
                if (employee.EmailId === "" || !regex.test(employee.EmailId)) {
                    _emailerror = "Email Required";
                    return { _emailerror }
                }
                else {
                    _emailerror = null;
                }
            case '_Address':
                if (employee.Address === "") {
                     _adderror = "Address Required";
                    return {  _adderror }
                }
                else {
                    _adderror = null;
                }
            case '_Country':
                if (employee.Country === "") {
                     _countryerror ="Country Required";
                    return {  _countryerror }
                }
            case '_State':
                if (employee.State === "") {
                    _stateerror = "State Required";
                    return { _stateerror }
                }
                else {
                    _stateerror = null;
                }
            case '_City':
                if (employee.City === "") {
                    _cityerror = "City Required";
                    return {  _cityerror }
                }
                else {
                    _cityerror = null;
                }
            default:
                return {
                    state
                }
        }
    }


    const [error, dispatch] = useReducer(reducer, initialState)
    //const errorContext = useContext(ErrorContext)

    //function empName() {
    //    if (employee.Name === "") {
    //        errorContext.errorDispatch({ type: 'name' })
    //        setErrors(errorContext.errorMsg.Name)
    //    }
    //    else {
    //        setErrors(!nameerrors);
    //    }
    //}

    //function empPhone() {
    //    if (employee.Phone === "") {
    //        errorContext.errorDispatch({ type: 'phone' })
    //        setError2(errorContext.errorMsg.Phone)
    //    }
    //    else {
    //        setError2(!phoneerrors);
    //    }
    //}

    //function emailValidate() {
    //    const emailId = $("#txtEmailId").val();
    //    let regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    //    if (!regex.test(emailId)) {
    //        $("#lblEmailIdError").html("Enter EmailId Please").show().fadeOut(2000);
    //        $("#txtEmailId").val("");
    //    }
    //}



    const url = "http://localhost:59447/api/EmployeeMasters/Create";
    const insertEmployee = (e) => {
        e.preventDefault();

        const data = {
            Name: employee.Name,
            Phone: employee.Phone,
            EmailId: employee.EmailId,
            DateofBirth: selectedDate,
            Address: employee.Address,
            Country: employee.Country,
            State: employee.State,
            City: employee.City
        }
            
            axios.post(url, data)
                .then((result => {
                    props.history.push('/')
                    store.addNotification({
                        title: 'Data Added',
                        message: 'Employee Added Successfully',
                        type: 'success',
                        container: 'center',
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 2000
                        }
                    })
                }))
                .catch(error => {
                    store.addNotification({
                        title: 'Database Error',
                        message: 'No Record Added',
                        type: 'warning',
                        container: 'center',
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 2000
                        }
                    })
                })
        //}
       
    }



    return (
       
        <React.Fragment>
            <Card className="mt-4">
                <Card.Header>
                    Add Employee
                    <span id="lblDetailedError" className="h3"></span>
                </Card.Header>
            </Card>
                <div className="container fluid ">
                    <div className="row">
                        <div className="col-sm">
                            <Form onSubmit={insertEmployee} autoComplete="off">
                                <Form.Row>
                                    <Col>
                                        <FormGroup>
                                            <label className="p-4"> Name:</label>
                                        <input type="text" className="form-control" name="Name" id="txtName" value={employee.Name}
                                            onChange={changeHandle} onBlur={() => dispatch({ type: '_Name' })} />
                                        <span id="lblNameError">{error._nameerror}</span>

                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <label className="p-4"> Phone:</label>
                                            <input type="text" className="form-control" name="Phone" id="txtPhone" value={employee.Phone} onChange={changeHandle}
                                            maxLength="10" onBlur={() => dispatch({ type: '_Phone' })}/>

                                        <span id="lblPhoneError">{error._phoneerror}</span>

                                        </FormGroup>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <FormGroup>
                                            <label className="p-4"> EmailId:</label>
                                        <input type="text" className="form-control" name="EmailId" id="txtEmailId" value={employee.EmailId}
                                            onChange={changeHandle} onBlur={() => dispatch({ type: '_EmailId' })} />

                                        <span id="lblEmailIdError">{error._emailerror}</span>

                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <label className="p-4"> Dob:</label>
                                        <DatePicker selected={selectedDate} id="txtDob" name="DateofBirth" value={selectedDate} className="form-control"   onChange={changeHandle2} dateFormat="dd/MM/yyyy" />
                                        {/*<input type="text" className="form-control" name="DateofBirth" id="txtDob" value={employee.Dob}  onChange={changeHandle} />
                                        <span id="lblDateofBirtherror"></span>*/}

                                        </FormGroup>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <FormGroup>
                                            <label className="p-4">Address:</label>
                                        <input type="text" className="form-control" name="Address" id="txtAddress" value={employee.Address} onChange={changeHandle}
                                            onBlur={() => dispatch({ type: '_Address' })} />

                                        <span id="lblAddressError">{error._adderror}</span>

                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <label className="p-4">Country:</label>
                                            <input type="text" className="form-control" name="Country" id="txtCountry" value={employee.Country} onChange={changeHandle}
                                            onBlur={() => dispatch({ type: '_Country' })} />

                                        <span id="lblCountryError">{error._countryerror}</span>

                                        </FormGroup>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <FormGroup>
                                            <label className="p-4"> State:</label>
                                            <input type="text" className="form-control" name="State" id="txtState" value={employee.State} onChange={changeHandle}
                                            onBlur={() => dispatch({ type: '_State' })} />

                                        <span id="lblStateError">{error._stateerror}</span>

                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <label className="p-4">City:</label>
                                            <input type="text" className="form-control" name="City" id="txtCity" value={employee.City} onChange={changeHandle}
                                            onBlur={() => dispatch({ type: '_City' })} />

                                        <span id="lblCityError">{error._cityerror}</span>

                                        </FormGroup>
                                    </Col>

                            </Form.Row>
                            <Form.Row className="mt-3">
                                    <Col >
                                    <FormGroup>
                                        <input type="submit" className="form-control btn btn-primary" value="Submit" />
                                        </FormGroup>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        
    )
}
