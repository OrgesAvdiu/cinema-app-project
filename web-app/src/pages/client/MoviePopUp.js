import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, Button, Typography, TextField, Select, MenuItem,
  InputLabel, FormControl
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from 'react-query';
import { QueryKeys } from "../../services/QueryKeys";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    backgroundColor: "#222",
    color: "white",
    padding: theme.spacing(2),
    borderRadius: "10px",
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
  price: {
    fontWeight: "bold",
    color: "#ff9800",
  },
  formControl: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  select: {
    width: "100%",
    color: "white",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
  },
  textField: {
    "& .MuiInputBase-root": { color: "white" },
    "& .MuiInputLabel-root": { color: "white" },
  },
}));

export default function MoviePopUp({ movie, handleClose, total, user }) {
  const classes = useStyles();
  const [customerInfo, setCustomerInfo] = useState({ firstName: '', lastName: '' });
  const [ticketCount, setTicketCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedCinema, setSelectedCinema] = useState('');
  
  const { data: cinemas, isLoading: cinemasLoading, isError: cinemasError } = useQuery(QueryKeys.CINEMA);

  useEffect(() => {
    if (movie) {
      setTotalPrice(movie.price * ticketCount);
    }
  }, [ticketCount, movie]);

  const handleTicketCountChange = (event) => {
    const count = Number(event.target.value);
    setTicketCount(count);
  };

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCinemaChange = (event) => {
    setSelectedCinema(event.target.value);
  };

  const handlePayment = async () => {
    const newTicket = {
      customer: { firstName: customerInfo.firstName, lastName: customerInfo.lastName },
      ticketCount,
      totalPrice,
      paymentMethod,
      cinema: { id: selectedCinema },
      movie: { id: movie.id, title: movie.title },
    };

    // Retrieve existing tickets, ensuring it's always an array
    const existingTickets = JSON.parse(localStorage.getItem("ticketDetails")) || [];

    // Ensure existingTickets is an array before updating
    const updatedTickets = Array.isArray(existingTickets) ? [...existingTickets, newTicket] : [newTicket];

    localStorage.setItem("ticketDetails", JSON.stringify(updatedTickets));

    setPaymentConfirmed(true);
  };

  if (cinemasLoading) return <div>Loading...</div>;
  if (cinemasError) return <div>Error loading cinemas data!</div>;
  if (!cinemas) return null;

  return (
    <>
      {!paymentConfirmed ? (
        <Dialog open={true} onClose={handleClose} classes={{ paper: classes.dialogPaper }}>
          <DialogTitle>{movie.title}</DialogTitle>
          <DialogContent>
            <div className={classes.detailsContainer}>
              <Typography variant="body1">{movie.description}</Typography>
              <Typography className={classes.price}>Price: {movie.price}$</Typography>
              <Typography>Duration: {movie.duration} mins</Typography>
              <Typography>Language: {movie.language}</Typography>
              <Typography>Rating: ⭐ {movie.rating}/10</Typography>
              <Typography>Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</Typography>
            </div>

            <TextField
              label="First Name"
              name="firstName"
              value={customerInfo.firstName}
              onChange={handleCustomerInfoChange}
              fullWidth
              className={classes.textField}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={customerInfo.lastName}
              onChange={handleCustomerInfoChange}
              fullWidth
              className={classes.textField}
            />
            <TextField
              label="Number of Tickets"
              type="number"
              value={ticketCount}
              onChange={handleTicketCountChange}
              fullWidth
              className={classes.textField}
              InputProps={{ inputProps: { min: 1 } }}
            />

            <FormControl className={classes.formControl}>
              <InputLabel shrink={true}>Select Cinema</InputLabel>
              <Select value={selectedCinema} onChange={handleCinemaChange} className={classes.select}>
                {cinemas.map((cinema) => (
                  <MenuItem key={cinema.id} value={cinema.id}>{cinema.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="h6">Total Price: ${totalPrice}</Typography>

            <FormControl className={classes.formControl}>
              <InputLabel shrink={true}>Select Payment Method</InputLabel>
              <Select value={paymentMethod} onChange={handlePaymentMethodChange} className={classes.select}>
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="credit_card">Credit Card</MenuItem>
                <MenuItem value="paypal">PayPal</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained" color="primary" onClick={handlePayment} fullWidth>
              Confirm Payment
            </Button>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog open={true} onClose={handleClose} classes={{ paper: classes.dialogPaper }}>
          <DialogTitle>Payment Confirmed</DialogTitle>
          <DialogContent>
            <Typography variant="h6">Thank you for your payment!</Typography>
            <Typography>Your tickets have been booked successfully.</Typography>
            <Button variant="contained" color="primary" onClick={handleClose} fullWidth>
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}