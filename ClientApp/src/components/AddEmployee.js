import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Col } from 'react-bootstrap';
import axios from 'axios';
import { store } from 'react-notifications-component'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import $ from 'jquery'
import './formvalidation.css'

//import { useForm } from 'react-hook-form'

export const AddEmployee = (props) => {

    const [employee, setemployee] = useState({ Name: '', Phone: '', EmailId: '', Address: '', Country: '', State: '', City: '', errors: '' });

    const changeHandle = (e) => {
        e.persist();
        setemployee({ ...employee, [e.target.name]: e.target.value });
        employee["EmailId"] = "";
    }

    const [selectedDate, setSelectedDate] = useState();
    const changeHandle2 = date => setSelectedDate(date);
    

    useEffect(() => {
        $("#txtName").on('focusout', function () {
            const name = $("#txtName").val();
            if (name === "") {
                $("#lblNameError").html("Enter name Please").show().fadeOut(2000);
            }
        });

        $("#txtPhone").on('focusout', function () {
            const phone = $("#txtPhone").val();
            if (phone === "") {
                $("#lblPhoneError").html("Enter Phone Number Please").show().fadeOut(2000);
            }
        });

        $("#txtEmailId").on('focusout', function () {
            //const emailId = $("#txtEmailId").val();
            if (employee["EmailId"] === "") {
                $("#lblEmailIdError").html("Enter EmailId Please").show().fadeOut(2000);
               
            }
        });


        $("#txtAddress").on('focusout', function () {
            const address = $("#txtAddress").val();
            if (address === "") {
                $("#lblAddressError").html("Enter Address Please").show().fadeOut(2000);
            }
        });

        $("#txtDob").on('focusout', function () {
            const dob = $("#txtDob").val();
            if (dob === "") {
                $("#lblDateofBirthError").html("Enter Dob Please").show().fadeOut(2000);
            }
        });
        $("#txtCountry").on('focusout', function () {
            const country = $("#txtCountry").val();
            if (country === "") {
                $("#lblCountryError").html("Enter Country").show().fadeOut(2000);
            }
        });
        $("#txtState").on('focusout', function () {
            const state = $("#txtState").val();
            if (state === "") {
                $("#lblStateError").html("Enter State").show().fadeOut(2000);
            }
        });
        $("#txtCity").on('focusout', function () {
            const city = $("#txtCity").val();
            if (city === "") {
                $("#lblCityError").html("Enter City").show().fadeOut(2000);
            }
        });
    });


    function emailValidate() {
        const emailId = $("#txtEmailId").val();
        let regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        if (!regex.test(emailId)) {
            $("#lblEmailIdError").html("Enter EmailId Please").show().fadeOut(2000);
            $("#txtEmailId").val("");
        }
    }

    const validate = () => {
        const name = $("#txtName").val();
        const phone = $("#txtPhone").val();
        const emailId = $("#txtEmailId").val();
        const address = $("#txtAddress").val();
        const dob = $("#txtDob").val();
        const country = $("#txtCountry").val();
        const state = $("#txtState").val();
        const city = $("#txtCity").val();
        if (name === "") {
            $("#lblNameError").html("Enter name Please").show().fadeOut(2000);
        }

        else if (phone === "") {
            $("#lblPhoneError").html("Enter Phone Number Please").show().fadeOut(2000);
        }

        else if (emailId === "") {
            $("#lblEmailIdError").html("Enter EmailId Please").show().fadeOut(2000);
        }

        else if (address === "") {
            $("#lblAddressError").html("Enter Address Please").show().fadeOut(2000);
        }


        else if (dob === "") {
            $("#lblDateofBirthError").html("Enter Dob Please").show().fadeOut(2000);
        }

        else if (country === "") {
            $("#lblCountryError").html("Enter Country").show().fadeOut(2000);
        }


        else if (state === "") {
            $("#lblStateError").html("Enter State").show().fadeOut(2000);
        }


        else if (city === "") {
            $("#lblCityError").html("Enter City").show().fadeOut(2000);
        }
    }



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
            debugger;
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
       
    }



    return (
        
            <React.Fragment>
                <div className="container fluid ">
                    <div className="row">
                        <div className="col-sm">
                            <Form onSubmit={insertEmployee} autoComplete="off">
                                <Form.Row>
                                    <Col>
                                        <FormGroup>
                                            <label className="p-4"> Name:</label>
                                            <input type="text" className="form-control" name="Name"
                                                id="txtName" value={employee.Name} onChange={changeHandle}  />

                                            <span id="lblNameError"></span>

                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <label className="p-4"> Phone:</label>
                                            <input type="text" className="form-control" name="Phone" id="txtPhone" value={employee.Phone} onChange={changeHandle}
                                                maxLength="10" />

                                        <span id="lblPhoneError"></span>

                                        </FormGroup>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <FormGroup>
                                            <label className="p-4"> EmailId:</label>
                                        <input type="text" className="form-control" name="EmailId" id="txtEmailId" value={employee.EmailId}
                                            onChange={changeHandle} onBlur={emailValidate } />

                                        <span id="lblEmailIdError"></span>

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
                                            />

                                        <span id="lblAddressError"></span>

                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <label className="p-4">Country:</label>
                                            <input type="text" className="form-control" name="Country" id="txtCountry" value={employee.Country} onChange={changeHandle}
                                            />

                                        <span id="lblCountryError"></span>

                                        </FormGroup>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <FormGroup>
                                            <label className="p-4"> State:</label>
                                            <input type="text" className="form-control" name="State" id="txtState" value={employee.State} onChange={changeHandle}
                                            />

                                        <span id="lblStateError"></span>

                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <label className="p-4">City:</label>
                                            <input type="text" className="form-control" name="City" id="txtCity" value={employee.City} onChange={changeHandle}
                                            />

                                        <span id="lblCityError"></span>

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
