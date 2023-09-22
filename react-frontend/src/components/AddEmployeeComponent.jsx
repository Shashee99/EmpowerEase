import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import axios from 'axios';

const AddEmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [currentProfilePicture, setCurrentProfilePicture] = useState(null); // New state for current profile picture
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/api/v1/${id}`,{}, {
               
            })
              
                .then((response) => {
                    console.log(response.data);
                    const { firstName, lastName, emailId, imageData } = response.data;
                    setFirstName(firstName);
                    setLastName(lastName);
                    setEmailId(emailId);
                    setCurrentProfilePicture(imageData); // Set the current profile picture URL
                })
                .catch((error) => {
                    console.log(error);
                });

                axios.get(`http://localhost:8080/api/v1/${id}`)
                .then((response) => {
                    const { firstName, lastName, emailId, contactNo , imageData } = response.data;
                    setFirstName(firstName);
                    setLastName(lastName);
                    setEmailId(emailId);
                    setContactNo(contactNo);
                    setCurrentProfilePicture(`data:image/jpeg;base64,${imageData}`);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [id]);

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
    
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('emailId', emailId);
        formData.append('contactNo', contactNo);
        formData.append('profilePicture', currentProfilePicture);
    
        if (id) {
            axios.put(`http://localhost:8080/api/v1/employees/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                    console.log(response.data);
                    navigate('/employees');
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios.post('http://localhost:8080/api/v1/employees', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                    console.log(response.data);
                    navigate('/employees');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const title = () => {
        if (id) {
            return <h2 className="text-center">Update Employee</h2>;
        } else {
            return <h2 className="text-center">Add Employee</h2>;
        }
    };

    return (
        <div>
            <br />
            <br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {title()}
                        <div className="card-body">
                            <form encType="multipart/form-data">
                                <div className="form-group mb-2">
                                    <label className="form-label">First Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter first name"
                                        name="firstName"
                                        className="form-control"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label">Last Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter last name"
                                        name="lastName"
                                        className="form-control"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label">Email Id:</label>
                                    <input
                                        type="email"
                                        placeholder="Enter email Id"
                                        name="emailId"
                                        className="form-control"
                                        value={emailId}
                                        onChange={(e) => setEmailId(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Contact No:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter contact No"
                                        name="contactNo"
                                        className="form-control"
                                        value={contactNo}
                                        onChange={(e) => setContactNo(e.target.value)}
                                    />
                                </div>

                                {/* Display current profile picture */}
                                {currentProfilePicture && (
                                    <div className="form-group mb-2">
                                        <label className="form-label">Current Profile Picture:</label>
                                        <img
                                                src={currentProfilePicture}
                                                alt="Current Profile"
                                                style={{
                                                    maxWidth: '200px', // Set the maximum width to 100px
                                                    maxHeight: '200px', // Set the maximum height to 100px
                                                   // Let the height adjust automatically
                                                    borderRadius: '1%', // To make it rounded
                                                }}
                                            />
                                    </div>
                                )}

                                <div className="form-group mb-2">
                                    <label className="form-label">Profile Picture:</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                                
                                        onChange={(e) => setCurrentProfilePicture(e.target.files[0])}
                                        className="form-control"
                                    />
                                </div>

                                <button
                                    className="btn btn-success"
                                    onClick={(e) => saveOrUpdateEmployee(e)}
                                >
                                    Submit
                                </button>
                                <Link to="/employees" className="btn btn-danger">
                                    Cancel
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmployeeComponent;
