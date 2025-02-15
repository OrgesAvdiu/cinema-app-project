import { useState, useEffect } from "react";
import { Box } from "lucide-react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// Importing images correctly
import image1 from "../../SliderImages/image1.jpg";
import image2 from "../../SliderImages/image2.jpg";
import image3 from "../../SliderImages/image3.jpg";
import MovieList from "./MovieList";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  buttonContainer: {
    marginTop: "20px",
    marginRight: "20px",
  },
  cartButton: {
    display: "flex",
    alignItems: "center",
    marginRight: "20px",
  },
  totalPrice: {
    marginLeft: theme.spacing(1),
    color: theme.palette.common.white,
  },
  showOffersButton: {
    marginTop: "50px",
    marginBottom: "50px",
  },
}));

export default function HomePage() {
  const classes = useStyles();
  console.log("Image Paths:", image1, image2, image3);
  
  const [movies, setMovies] = useState([]); // State for movies
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Simulating API fetch
  useEffect(() => {
    // Example data, replace with API call
    setMovies([
      { id: 1, title: "Movie 1", poster: "/path-to-poster1.jpg" },
      { id: 2, title: "Movie 2", poster: "/path-to-poster2.jpg" },
    ]);
  }, []);

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
    setShowPopup(true);
  };

  const items = [image1, image2, image3];

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ margin: "40px auto", width: "85%" }}>
        <Carousel 
          showThumbs={false} 
          showArrows={true} 
          showStatus={false} 
          autoPlay={true} 
          interval={3000} // Change image every 3 seconds
          infiniteLoop={true} 
          stopOnHover={false}
        >
          {items.map((image, i) => (
            <div key={i} style={{ height: "70vh" }}>
              <img
                src={image}
                alt={`Slide ${i}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ))}
        </Carousel>
      </div>

      {movies.length > 0 && (
        <MovieList movies={movies} handleMovieClick={handleMovieClick} />
      )}
    </div>
  );
}