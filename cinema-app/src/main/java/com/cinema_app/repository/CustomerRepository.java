package com.cinema_app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinema_app.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer,Long>{
    Optional<Customer> findByEmail(String email);

     boolean existsByEmail(String email);
}
