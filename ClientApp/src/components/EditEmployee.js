import React, { useState, useEffect, useReducer } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Form, FormGroup, Col } from 'react-bootstrap';
import axios from 'axios'
import $ from 'jquery'
import './formvalidation.css'

export const EditEmployee = (props) => {

    const [employee, setData] = useState({ EmpId: '', Name: '', Phone: '', EmailId: '', Address: '', Country: '', State: '', City: '' });
    const changeHandle = (e) => {
        e.persist();
        setData({ ...employee, [e.target.name]: e.target.value });
    }

    const [selectedDate, setSelectedDate] = useState(null);
    const changeHandle2 = date => setSelectedDate(date);

  

    const url = "http://localhost:59447/api/EmployeeMasters/Update";
    const _detailUrl = "http://localhost:59447/api/EmployeeMasters/Details?id=" + props.match.params.id;

    useEffect(() => {
        axios.get(_detailUrl)
            .then(res => {
                setData(res.data)
            })
    },[]);


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
                if (employee.name === "") {
                    _nameerror = "Name Required";
                    return { _nameerror }
                }
                else {
                    _nameerror = null;
                }
            case '_Phone':
                if (employee.phone === "") {
                    _phoneerror = "Phone Required";
                    return { _phoneerror }
                }
                else {
                    _phoneerror = null;
                }
            case '_EmailId':
                let regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
                if (employee.emailId === "" || !regex.test(employee.emailId)) {
                    _emailerror = "Email Required";
                    return { _emailerror }
                }
                else {
                    _emailerror = null;
                }
            case '_Address':
                if (employee.address === "") {
                    _adderror = "Address Required";
                    return { _adderror }
                }
                else {
                    _adderror = null;
                }
            case '_Country':
                if (initialState.country === "") {
                    _countryerror = "Country Required";
                    return { _countryerror }
                }
            case '_State':
                if (employee.state === "") {
                    _stateerror = "State Required";
                    return { _stateerror }
                }
                else {
                    _stateerror = null;
                }
            case '_City':
                if (employee.city === "") {
                    _cityerror = "City Required";
                    return { _cityerror }
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

    //function emailValidate() {
    //    const emailId = $("#txtEmailId").val();
    //    let regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    //    if ( !regex.test(emailId)) {
    //        $("#lblEmailIdError").html("Enter EmailId Please").show().fadeOut(2000);
    //        $("#txtEmailId").val("");
    //    }
    //}



    const editEmployee = (e) => {
       
        e.preventDefault();
        //const isValid = validate();
        //if (isValid) {
            const data = {
                EmpId: parseInt(props.match.params.id),
                Name: employee.name,
                Phone: employee.phone,
                EmailId: employee.emailId,
                Address: employee.address,
                Country: employee.country,
                State: employee.state,
                City: employee.city,
                DateofBirth: employee.dateofBirth

            }
            axios.put(url, data)
                .then(res => {
                    props.history.push('/')
                })
        //}
    }


    return (
        <React.Fragment>
            <div className="container fluid ">
                <div className="row">
                    <div className="col-sm">
                        <Form onSubmit={editEmployee}>
                            <Form.Row>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4"> Name:</label>
                                        <input type="text" className="form-control" name="name" id="txtName" value={employee.name} onChange={changeHandle}
                                            onBlur={() => dispatch({ type: '_Name' })} />

                                        <span id="lblNameError">{error._nameerror}</span>

                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4"> Phone:</label>
                                        <input type="text" className="form-control" name="phone" id="txtPhone" value={employee.phone} onChange={changeHandle} maxLength="10"
                                            onBlur={() => dispatch({ type: '_Phone' })} />

                                        <span id="lblPhoneError">{error._phoneerror}</span>

                                    </FormGroup>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4"> EmailId:</label>
                                        <input type="text" className="form-control" name="emailId" id="txtEmailId" value={employee.emailId} onChange={changeHandle}
                                            onBlur={() => dispatch({ type: '_EmailId' })} />

                                        <span id="lblEmailIdError">{error._emailerror}</span>

                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4"> Dob:</label>
                                        <DatePicker selected={selectedDate} id="txtDob" name="dateofBirth" value={employee.dateofBirth } className="form-control"
                                            onChange={changeHandle2} dateFormat="dd/MM/yyyy" readOnly  />


                                        

                                    </FormGroup>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4">Address:</label>
                                        <input type="text" className="form-control" name="address" id="txtAddress" value={employee.address} onChange={changeHandle}
                                            onBlur={() => dispatch({ type: '_Address' })} />

                                        <span id="lblAddressError">{error._adderror}</span>
                                        

                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4">Country:</label>
                                        <input type="text" className="form-control" name="country" id="txtCountry" value={employee.country} onChange={changeHandle}
                                            onBlur={() => dispatch({ type: '_Country' })} />

                                        <span id="lblCountryError">{error._countryerror}</span>

                                    </FormGroup>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4"> State:</label>
                                        <input type="text" className="form-control" name="state" id="txtState" value={employee.state} onChange={changeHandle}
                                            onBlur={() => dispatch({ type: '_State' })} />

                                        <span id="lblStateError">{error._stateerror}</span>

                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4">City:</label>
                                        <input type="text" className="form-control" name="city" id="txtCity" value={employee.city} onChange={changeHandle}
                                            onBlur={() => dispatch({ type: '_City' })} />

                                        <span id="lblCityError"> {error._cityerror}</span>

                                    </FormGroup>
                                </Col>

                            </Form.Row>
                            <Form.Row>
                                <Col>
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