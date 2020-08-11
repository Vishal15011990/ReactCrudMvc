﻿import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Col, Button, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { store } from 'react-notifications-component'

export const AddEmployee = () => {

    const [employee, setemployee] = useState({ Name: '', Phone: '', EmailId: '', Dob: '', Address: '', Country: '', State: '', City: '', ZipCode: '' });

    const changeHandle = (e) => {
        e.persist();
        setemployee({ ...employee, [e.target.name]: e.target.value });
    }

    const url = "http://localhost:44322/api/EmployeeMasters";
    const insertEmployee = (e) => {
        e.preventDefault();
        debugger;
        const data = { Name: employee.Name, Phone: employee.Phone, EmailId: employee.EmailId, Dob: employee.Dob, Address: employee.Address, Country: employee.Country, State: employee.State, City: employee.City, ZipCode: employee.ZipCode }
        axios.post(url + '/Create', data)
            .then((result => {
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
                        <Form onSubmit={insertEmployee}>
                            <Form.Row>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4"> Name:</label>
                                        <input type="text" className="form-control" name="Name" id="txtName" value={employee.Name} onChange={changeHandle} />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4"> Phone:</label>
                                        <input type="text" className="form-control" name="Phone" id="txtPhone" value={employee.Phone} onChange={changeHandle} maxLength="10" />
                                    </FormGroup>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4"> EmailId:</label>
                                        <input type="text" className="form-control" name="EmailId" id="txtEmailId" value={employee.EmailId} onChange={changeHandle} />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4"> Dob:</label>
                                        <input type="date" className="form-control" name="Dob" id="txtDob" value={employee.Dob} onChange={changeHandle} />
                                    </FormGroup>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4">Address:</label>
                                        <input type="text" className="form-control" name="Address" id="txtAddress" value={employee.Address} onChange={changeHandle} />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4">Country:</label>
                                        <input type="text" className="form-control" name="Country" id="txtCountry" value={employee.Country} onChange={changeHandle} />
                                    </FormGroup>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4"> State:</label>
                                        <input type="text" className="form-control" name="State" id="txtState" value={employee.State} onChange={changeHandle} />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4">City:</label>
                                        <input type="text" className="form-control" name="City" id="txtCity" value={employee.City} onChange={changeHandle} />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4"> Zipcode:</label>
                                        <input type="text" className="form-control" name="ZipCode" id="txtZipCode" value={employee.ZipCode} onChange={changeHandle} />
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
