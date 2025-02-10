package com.cinema_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import com.cinema_app.model.MovieDetail;

public interface MovieDetailRepository extends JpaRepository<MovieDetail,Long>{

     @Query(
        "SELECT m FROM MovieDetail m "+
        "LEFT JOIN m.customer c "+
        "WHERE (?1 = '' OR LOWER(c.firstName) LIKE %?1% OR LOWER(c.lastName) LIKE %?1%) "    )
    List<MovieDetail> findByCustomer_Id(Long customerId);
}