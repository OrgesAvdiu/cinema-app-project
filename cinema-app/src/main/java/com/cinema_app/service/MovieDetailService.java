package com.cinema_app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinema_app.model.Cinema;
import com.cinema_app.model.Customer;
import com.cinema_app.model.Movie;
import com.cinema_app.model.MovieDetail;
import com.cinema_app.repository.CinemaRepository;
import com.cinema_app.repository.CustomerRepository;
import com.cinema_app.repository.MovieDetailRepository;
import com.cinema_app.repository.MovieRepository;

import jakarta.transaction.Transactional;

@Service
public class MovieDetailService extends BasicServiceOperations<MovieDetailRepository, MovieDetail> {

    @Autowired
    private MovieDetailRepository movieDetailRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CinemaRepository cinemaRepository;

    @Autowired
    private MovieRepository movieRepository;

    public MovieDetailService(MovieDetailRepository repository) {
        super(repository);
    }

    public MovieDetail save(MovieDetail movieDetail) {
        if(movieDetail.getCustomer() != null) {

            Customer customer = movieDetail.getCustomer();

            customerRepository.save(customer);
        }

        return super.save(movieDetail);
    }
}