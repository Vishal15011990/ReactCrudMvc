import React, { useState, useEffect } from 'react';
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
            const emailId = $("#txtEmailId").val();
            let regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
            if (emailId === "" || !regex.test(emailId)) {
                $("#lblEmailIdError").html("Enter EmailId Please").show().fadeOut(2000);
                $("#txtEmailId").val("");
            }
        });


        //$("#txtEmailId").on('blur', function () {
        //    const emailId2 = $("#txtEmailId").val();
        //    let regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        //    if (!regex.test(emailId2)) {
        //        $("#lblEmailIdError").html("Email Id Is Not Valid").show().fadeOut(1000);
        //        $("#txtEmailId").val("");
        //    }

        //});


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
       
        axios.get(_detailUrl)
            .then(res => {
                setData(res.data)
            })
    },[]);


    const editEmployee = (e) => {
        debugger;
        e.preventDefault();
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
        axios.put(url,data)
            .then(res => {
                props.history.push('/')
            })
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
                                        <input type="text" className="form-control" name="name" id="txtName"  value={employee.name } onChange={changeHandle} />

                                        <span id="lblNameError"></span>

                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4"> Phone:</label>
                                        <input type="text" className="form-control" name="phone" id="txtPhone" value={employee.phone } onChange={changeHandle} maxLength="10" />

                                        <span id="lblPhoneError"></span>

                                    </FormGroup>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4"> EmailId:</label>
                                        <input type="text" className="form-control" name="emailId" id="txtEmailId" value={employee.emailId} onChange={changeHandle} />

                                        <span id="lblEmailIdError"></span>

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
                                        <input type="text" className="form-control" name="address" id="txtAddress" value={employee.address } onChange={changeHandle} />

                                        <span id="lblAddressError"></span>
                                        

                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4">Country:</label>
                                        <input type="text" className="form-control" name="country" id="txtCountry" value={employee.country } onChange={changeHandle} />

                                        <span id="lblCountryError"></span>

                                    </FormGroup>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4"> State:</label>
                                        <input type="text" className="form-control" name="state" id="txtState" value={employee.state } onChange={changeHandle} />

                                        <span id="lblStateError"></span>

                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4">City:</label>
                                        <input type="text" className="form-control" name="city" id="txtCity" value={employee.city } onChange={changeHandle} />

                                        <span id="lblCityError"></span>

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