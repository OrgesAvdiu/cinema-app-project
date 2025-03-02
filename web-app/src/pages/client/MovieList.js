import React, { useState } from "react";
import { useQuery } from "react-query";
import { Grid, Paper, Typography, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import { MovieService } from "../../services/MovieService";
import MoviePopUp from "./MoviePopUp";
import { QueryKeys } from "../../services/QueryKeys";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: "#191919",
      color: "white",
      minHeight: "100vh"
    },
    paper: {
      width: '95%',
      marginBottom: "100px",
      marginTop: "40px",
      backgroundColor: "#191919", // Same color as the page
      padding: "20px",
      borderRadius: "10px",
      [theme.breakpoints.down('sm')]: {
        marginTop: "20px",
        marginBottom: "50px",
        width: '100%',
      },
    },
    movieContainer: {
      textAlign: "center",
      position: "relative",
      width: "100%",
      cursor: "pointer",
      transition: "transform 0.2s ease-in-out",
      "&:hover": {
        transform: "scale(1.05)",
      },
    },
    movieImage: {
      width: "277px", 
      height: "402px", 
      borderRadius: "10px",
      objectFit: "cover",
    },
    movieInfo: {
      marginTop: "15px",
    },
  }));
  

export default function MovieList({ onAddToCart }) {
  const classes = useStyles();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { data: movies, isLoading } = useQuery(QueryKeys.MOVIE);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleClosePopup = () => {
    setSelectedMovie(null);
  };

  const handleAddToCart = (movie) => {
    setSnackbarMessage(`${movie.title} successfully added to cart!`);
    setShowSuccess(true);
    onAddToCart(movie);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setShowSuccess(false);
  };

  if (isLoading) {
    return <div>Loading movies...</div>;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center" style={{ marginBottom: "20px", color: "white" }}>
        </Typography>
        <Grid container spacing={2}>
          {movies?.map((movie) => (
            <Grid key={movie.id} item xs={12} sm={6} md={4} onClick={() => handleMovieClick(movie)}>
              <div className={classes.movieContainer}>
                <img
                  src={`../../../movies/${movie.imageUrl}`}
                  alt={movie.title}
                  className={classes.movieImage}
                />
                <div className={classes.movieInfo}>
                  <Typography variant="h6" style={{ fontWeight: "bold", color: "white" }}>
                    {movie.title}
                  </Typography>
                  <Typography style={{ color: "#ccc" }}>{movie.price}$</Typography>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>

        {selectedMovie && (
          <MoviePopUp
            movie={selectedMovie}
            handleClose={handleClosePopup}
            handleAddToCart={handleAddToCart}
            classes={classes}
          />
        )}

        <Snackbar open={showSuccess} autoHideDuration={1000} onClose={handleSnackbarClose}>
          <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Paper>
    </div>
  );
}
