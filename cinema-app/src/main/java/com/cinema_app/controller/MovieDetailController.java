package com.cinema_app.controller;

import com.cinema_app.model.City;
import com.cinema_app.model.Movie;
import com.cinema_app.model.MovieDetail;
import com.cinema_app.service.CityService;
import com.cinema_app.service.MovieDetailService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/movieDetails")
public class MovieDetailController extends BasicControllerOperations<MovieDetailService, MovieDetail>{

    public MovieDetailController(MovieDetailService service) {
        super(service);
        //TODO Auto-generated constructor stub
    }
    
}
