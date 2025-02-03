package com.cinema_app.service;

import org.springframework.stereotype.Service;

import com.cinema_app.model.Room;
import com.cinema_app.repository.RoomRepository;

@Service
public class RoomService  extends BasicServiceOperations<RoomRepository, Room>{

    public RoomService(RoomRepository repository) {
        super(repository);
        //TODO Auto-generated constructor stub
    }
    
}
