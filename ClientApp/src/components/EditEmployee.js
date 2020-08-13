import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Form, FormGroup, Col } from 'react-bootstrap';
import axios from 'axios'

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
                                        <input type="text" className="form-control" name="name" id="txtName" placeholder="Name" value={employee.name || " "} onChange={changeHandle} />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4"> Phone:</label>
                                        <input type="text" className="form-control" name="phone" id="txtPhone" value={employee.phone || " "} onChange={changeHandle} maxLength="10" />
                                    </FormGroup>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4"> EmailId:</label>
                                        <input type="text" className="form-control" name="emailId" id="txtEmailId" value={employee.emailId || " "} onChange={changeHandle} />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4"> Dob:</label>
                                        <DatePicker selected={selectedDate} id="txtDob" name="dateofBirth" value={employee.dateofBirth || " "} className="form-control"
                                            onChange={changeHandle2} dateFormat="dd/MM/yyyy" />
                                    </FormGroup>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4">Address:</label>
                                        <input type="text" className="form-control" name="address" id="txtAddress" value={employee.address || " "} onChange={changeHandle} />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4">Country:</label>
                                        <input type="text" className="form-control" name="country" id="txtCountry" value={employee.country || " "} onChange={changeHandle} />
                                    </FormGroup>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4"> State:</label>
                                        <input type="text" className="form-control" name="state" id="txtState" value={employee.state || " "} onChange={changeHandle} />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <label className="p-4">City:</label>
                                        <input type="text" className="form-control" name="city" id="txtCity" value={employee.city || " " } onChange={changeHandle} />
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