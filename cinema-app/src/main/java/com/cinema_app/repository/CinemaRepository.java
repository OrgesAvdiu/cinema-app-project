package com.cinema_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinema_app.model.Cinema;

public interface CinemaRepository extends JpaRepository<Cinema,Long>{
    
}
