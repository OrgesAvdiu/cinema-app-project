package com.cinema_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinema_app.model.MovieDetail;

public interface MovieDetailRepository extends JpaRepository<MovieDetail,Long>{
    
}
