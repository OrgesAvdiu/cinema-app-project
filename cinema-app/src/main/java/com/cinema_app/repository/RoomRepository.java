package com.cinema_app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinema_app.model.Room;

public interface RoomRepository extends JpaRepository<Room,Long>{
    // Optional<Room> findByName(String name);
}
