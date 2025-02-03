package com.cinema_app.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinema_app.model.Cinema;
import com.cinema_app.model.Offer;
import com.cinema_app.service.CinemaService;
import com.cinema_app.service.OfferService;

@RestController
@RequestMapping("/cinemas")
public class CinemaController extends BasicControllerOperations<CinemaService, Cinema>{

    public CinemaController(CinemaService service) {
        super(service);
        //TODO Auto-generated constructor stub
    }
    
}
