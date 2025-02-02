package com.cinema_app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinema_app.model.Movie;

public interface MovieRepository extends JpaRepository<Movie,Long>{
    // Optional<Movie> findByName(String name);
}
