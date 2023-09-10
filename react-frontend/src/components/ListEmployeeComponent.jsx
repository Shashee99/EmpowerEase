import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function ListEmployeeComponent() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  // const [name,setname] = useState();


  useEffect(() => {
    getAllEmployees();
  }, []);

  const addEmployee = () => {
    navigate('/add-employee');
  };
  const editEmployee =(id) =>{
    navigate(`/edit-employee/${id}`)

  }

  const getAllEmployees = () => {
    EmployeeService.getEmployees().then((res) => {
      setEmployees(res.data);
    });
  }

  const deleteEmployee = (id) =>{
     EmployeeService.deleteEmployeeById(id).then((res) => {
      getAllEmployees()
     }).catch((err) => {console.log(err)}); 
  }

  const test =()=>{
    EmployeeService.getEmployeeById(3).then((res)=>{
      console.log(res.data)
    }).catch((err) => {console.log(err)}); 
  
  }
  test()

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
              <th>Employee First Name</th>
              <th>Employee Last Name</th>
              <th>Employee Email Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.emailId}</td>
                <td>
                  <div className="row">
                  <button onClick={ () => editEmployee(employee.id)} className='btn btn-info'>Update</button>
                  <button onClick={ () => deleteEmployee(employee.id)} style={{marginLeft:"10px"}} className='btn btn-danger'>Delete</button>  
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
