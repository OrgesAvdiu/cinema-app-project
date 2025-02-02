package com.cinema_app.service;

import org.springframework.stereotype.Service;

import com.cinema_app.model.City;
import com.cinema_app.repository.CityRepository;

@Service
public class CityService  extends BasicServiceOperations<CityRepository, City>{

    public CityService(CityRepository repository) {
        super(repository);
    }

    
}
