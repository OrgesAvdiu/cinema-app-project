package com.cinema_app.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinema_app.model.City;
import com.cinema_app.service.CityService;

@RestController
@RequestMapping("/city")
public class CityController extends BasicControllerOperations<CityService, City>{
     public CityController(CityService service) {
      super(service);
   }
}
