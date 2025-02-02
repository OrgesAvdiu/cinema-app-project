package com.cinema_app.service;

import org.springframework.stereotype.Service;

import com.cinema_app.model.Offer;
import com.cinema_app.repository.OfferRepository;
@Service
public class OfferService  extends BasicServiceOperations<OfferRepository, Offer>{

    public OfferService(OfferRepository repository) {
        super(repository);
        //TODO Auto-generated constructor stub
    }
    
}
