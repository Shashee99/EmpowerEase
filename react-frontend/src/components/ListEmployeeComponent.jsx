import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import axios from 'axios';

function ListEmployeeComponent() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees();
  }, []);

  const addEmployee = () => {
    navigate('/add-employee');
  };

  const editEmployee = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  const getAllEmployees = () => {
    axios.get(`http://localhost:8080/api/v1/employees`)
    .then((response) => {
       setEmployees(response.data);
        // setFirstName(firstName);
        // setLastName(lastName);
        // setEmailId(emailId);
        // setCurrentProfilePicture(`data:image/jpeg;base64,${imageData}`);
    })
    .catch((error) => {
        console.error(error);
    });
  };

  const deleteEmployee = (id) => {
    EmployeeService.deleteEmployeeById(id)
      .then((res) => {
        getAllEmployees();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2 className='text-center'>Employees List</h2>
      <div className='row'>
        <button className='btn btn-primary' onClick={addEmployee}>
          Add Employee
        </button>
      </div>
      <div className='row'>
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>Profile</th> {/* New column for profile images */}
              <th>Employee First Name</th>
              <th>Employee Last Name</th>
              <th>Employee Email Id</th>
              <th>Contact No</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employeeId}>
                <td>
                  <img
                    src={`data:image/jpeg;base64,${employee.imageData}`} // Assuming you have a profilePicture URL in your employee data

                    alt='Profile'
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                    }}
                  />
                </td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.emailId}</td>
                <td>{employee.contactNo}</td>
                <td>
                  <div className='row'>
                    <button
                      onClick={() => editEmployee(employee.employeeId)}
                      className='btn btn-info'
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteEmployee(employee.employeeId)}
                      style={{ marginLeft: '10px' }}
                      className='btn btn-danger'
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListEmployeeComponent;
