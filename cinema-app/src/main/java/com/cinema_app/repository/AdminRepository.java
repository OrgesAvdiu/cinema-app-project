package com.cinema_app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinema_app.model.Admin;

public interface AdminRepository extends JpaRepository<Admin,Long>{
    
    Optional<Admin> findByEmail(String email);

}
