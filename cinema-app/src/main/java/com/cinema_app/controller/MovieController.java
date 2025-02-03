package com.cinema_app.controller;

import com.cinema_app.model.City;
import com.cinema_app.model.Movie;
import com.cinema_app.service.CityService;
import com.cinema_app.service.MovieService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/movies")
public class MovieController extends BasicControllerOperations<MovieService, Movie>{

    public MovieController(MovieService service) {
        super(service);
        //TODO Auto-generated constructor stub
    }
    
}
