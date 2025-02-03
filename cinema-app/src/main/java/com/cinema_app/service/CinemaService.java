package com.cinema_app.service;

import org.springframework.stereotype.Service;

import com.cinema_app.model.Cinema;
import com.cinema_app.repository.CinemaRepository;

@Service
public class CinemaService extends BasicServiceOperations<CinemaRepository, Cinema>{

    public CinemaService(CinemaRepository repository) {
        super(repository);
        //TODO Auto-generated constructor stub
    }
    
}
