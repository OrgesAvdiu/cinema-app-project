package com.cinema_app.service;

import org.springframework.stereotype.Service;

import com.cinema_app.model.MovieDetail;
import com.cinema_app.repository.MovieDetailRepository;

@Service
public class MovieDetailService  extends BasicServiceOperations<MovieDetailRepository, MovieDetail>{

    public MovieDetailService(MovieDetailRepository repository) {
        super(repository);
        //TODO Auto-generated constructor stub
    }
}
