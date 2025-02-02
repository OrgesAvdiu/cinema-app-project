package com.cinema_app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinema_app.model.Category;


public interface CategoryRepository extends JpaRepository<Category,Long>{
    // Optional<Category> findByName(String name);
}
