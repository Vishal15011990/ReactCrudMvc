import React, { useEffect, useState } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import axios from 'axios';


export const FetchEmployee = (props) => {
    const [data, setData] = useState([]);

    const url = "http://localhost:59447/api/EmployeeMasters/Get";
    useEffect(() => {
        //debugger;
        axios.get(url)
            .then(res => {
                setData(res.data)
            })
            //.catch(err => setHasError(true))
    }, []);



    const edit = (id) => {
        props.history.push({
            pathname: '/Edit'+id
        });
         
    }



    return (
        <React.Fragment>
            <Card className="mt-4">
                <Card.Header>
                    <h1 className="h3">Get Data</h1>
                </Card.Header>
            </Card>
            <div className="container animated easeOut">
                <Table responsive className="striped table-hover mt-2">
                    <thead className="bg-dark text-white">
                    <tr>
                        <th>Name</th>

                        <th>Phone </th>

                        <th>EmailId </th>

                        <th>Dob</th>

                        <th>Address </th>

                        <th>Country </th>

                        <th>State</th>

                        <th>City</th>

                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                       
                        data.map((item, index) => {
                           
                            return <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>{item.emailId}</td>
                                <td>{item.dateofBirth}</td>
                                <td>{item.address}</td>
                                <td>{item.country}</td>
                                <td>{item.state}</td>
                                <td>{item.city}</td>
                                <div>
                                    <td>
                                        <Button variant="primary" onClick={() => { edit(item.empId) }}>Edit</Button>
                                    </td>
                                    <td>
                                        <Button variant="success" >Delete</Button>
                                    </td>
                                </div>
                            </tr>
                        })
                    }
                </tbody>
                </Table>
            </div>
        </React.Fragment>
    )
}