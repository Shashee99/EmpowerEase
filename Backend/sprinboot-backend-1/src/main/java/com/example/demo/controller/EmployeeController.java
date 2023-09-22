package com.example.demo.controller;


import com.example.demo.dto.EmployeeWithImageDTO;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Employee;
import com.example.demo.model.Image;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.ImageRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class EmployeeController {

    private final EmployeeRepository employeeRepository;
    private final ImageRepository imageRepository;

    public EmployeeController(EmployeeRepository employeeRepository, ImageRepository imageRepository) {
        this.employeeRepository = employeeRepository;
        this.imageRepository = imageRepository;
    }

//    Get all employees
    @GetMapping("/employees")
    public ResponseEntity<List<EmployeeWithImageDTO>> getAllEmployees(){

        List<EmployeeWithImageDTO> employeelist = new ArrayList<>();

        List<Employee> employees = employeeRepository.findAll();

        for(Employee employee : employees){
            Optional<Image> imageOptional = imageRepository.findById(employee.getId());
            if (imageOptional.isPresent()) {
                byte[] imageData = imageOptional.get().getImageData();
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.IMAGE_JPEG);

                EmployeeWithImageDTO employeeWithImageDTO = new EmployeeWithImageDTO();
                employeeWithImageDTO.setEmployeeId(employee.getId());
                employeeWithImageDTO.setEmailId(employee.getEmailId());
                employeeWithImageDTO.setFirstName(employee.getFirstName());
                employeeWithImageDTO.setLastName(employee.getLastName());
                employeeWithImageDTO.setContactNo(employee.getContactNo());
                employeeWithImageDTO.setImageData(imageData);
                employeelist.add(employeeWithImageDTO);
            }
        }

        return ResponseEntity.ok(employeelist);
    }

//    create employee REST
@PostMapping("/employees")
public ResponseEntity<Employee> createEmployee(
        @RequestPart("firstName") String firstName,
        @RequestPart("lastName") String lastName,
        @RequestPart("emailId") String emailId,
        @RequestPart("contactNo") String contactNo,
        @RequestPart("profilePicture") MultipartFile profilePicture
) throws IOException {
    try {
        byte[] imageData = profilePicture.getBytes();
        Image image = new Image();
        image.setImageData(imageData);

        Employee employee = new Employee();
        employee.setFirstName(firstName);
        employee.setLastName(lastName);
        employee.setEmailId(emailId);
        employee.setContactNo(contactNo);
        image.setEmployee(employee); // Set the employee for the image
        employee.setImage(image); // Set the image for the employee



        return ResponseEntity.ok(employeeRepository.save(employee));
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.ok(null);
    }
}


//    Get employee by id
@GetMapping("/{id}")
public ResponseEntity<EmployeeWithImageDTO> getEmployeeById(@PathVariable Long id) {
    Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));

    Optional<Image> imageOptional = imageRepository.findById(id);
    if (imageOptional.isPresent()) {
        byte[] imageData = imageOptional.get().getImageData();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);

        EmployeeWithImageDTO employeeWithImageDTO = new EmployeeWithImageDTO();
        employeeWithImageDTO.setEmployeeId(employee.getId());
        employeeWithImageDTO.setEmailId(employee.getEmailId());
        employeeWithImageDTO.setFirstName(employee.getFirstName());
        employeeWithImageDTO.setLastName(employee.getLastName());
        employeeWithImageDTO.setContactNo(employee.getContactNo());
        employeeWithImageDTO.setImageData(imageData);

        return ResponseEntity.ok(employeeWithImageDTO);
    } else {
        return ResponseEntity.notFound().build();
    }
}
//    update employee id
@PutMapping("/employees/{id}")
public ResponseEntity<Employee> updateEmployee(@PathVariable Long id,
                                               @RequestPart("firstName") String firstName,
                                               @RequestPart("lastName") String lastName,
                                               @RequestPart("emailId") String emailId,
                                               @RequestPart("contactNo") String contactNo,
                                               @RequestPart(value = "profilePicture", required = false) MultipartFile profilePicture)
        throws IOException {
    Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id : " + id));

    Image img = imageRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Image not exist with id : " + id));

    // Check if a new profile picture is provided
    if (profilePicture != null) {
        img.setImageData(profilePicture.getBytes());
        imageRepository.save(img);
    }

    employee.setFirstName(firstName);
    employee.setLastName(lastName);
    employee.setEmailId(emailId);
    employee.setContactNo(contactNo);
    employee.setImage(img);

    Employee updatedEmployee = employeeRepository.save(employee);
    return ResponseEntity.ok(updatedEmployee);
}

    //    delete employee
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable Long id){
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id : "+id));

        employeeRepository.delete(employee);

        return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);
    }







}
