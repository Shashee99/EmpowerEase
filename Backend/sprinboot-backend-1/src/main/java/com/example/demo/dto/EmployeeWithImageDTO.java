package com.example.demo.dto;

import lombok.Data;

@Data
public class EmployeeWithImageDTO {
    private Long employeeId;
    private String firstName;
    private String lastName;
    private String emailId;
    private String contactNo;

    private byte[] imageData;

//    public EmployeeWithImageDTO() {
//        this.employeeId = employee.getId();
//        this.firstName = employee.getFirstName();
//        this.lastName = employee.getLastName();
//        this.emailId = employee.getEmailId();
//
//        if (employee.getImage() != null) {
//            this.imageData = employee.getImage().getImageData();
//        }
//    }
}
