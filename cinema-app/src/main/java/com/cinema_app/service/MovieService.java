package com.cinema_app.service;

import org.springframework.stereotype.Service;

import com.cinema_app.model.Movie;
import com.cinema_app.repository.MovieRepository;
@Service
public class MovieService  extends BasicServiceOperations<MovieRepository, Movie>{

    public MovieService(MovieRepository repository) {
        super(repository);     
    }
    
}
