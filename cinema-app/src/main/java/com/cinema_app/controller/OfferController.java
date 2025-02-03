package com.cinema_app.controller;

import com.cinema_app.model.City;
import com.cinema_app.model.Offer;
import com.cinema_app.service.CityService;
import com.cinema_app.service.OfferService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/offers")
public class OfferController extends BasicControllerOperations<OfferService, Offer>{
    public OfferController(OfferService service) {
        super(service);
    }
    
}
