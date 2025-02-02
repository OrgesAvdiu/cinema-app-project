package com.cinema_app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinema_app.model.Offer;

public interface OfferRepository extends JpaRepository<Offer,Long>{
    // Optional<Offer> findByName(String name);
}
