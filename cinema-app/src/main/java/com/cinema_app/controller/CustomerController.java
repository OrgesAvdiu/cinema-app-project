package com.cinema_app.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinema_app.model.Customer;
//import com.cinema_app.payload.LoginPayload;
import com.cinema_app.service.CustomerService;

@RestController
@RequestMapping("/customers")
public class CustomerController extends BasicControllerOperations<CustomerService, Customer>{
    public CustomerController(CustomerService service) {
        super(service);
    }

    // @PostMapping("/login")
    // public Customer login(@RequestBody @Validated LoginPayload login) {
    //     return this.service.login(login.getEmail(), login.getPassword());
    //}
}
