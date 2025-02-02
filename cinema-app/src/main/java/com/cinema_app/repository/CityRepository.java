package com.cinema_app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinema_app.model.City;

public interface CityRepository extends JpaRepository<City,Long>{
    // Optional<City> findByName(String name);
}
