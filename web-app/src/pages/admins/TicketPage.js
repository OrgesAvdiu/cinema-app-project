import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    color: "white",
    backgroundColor: "#222",
    minHeight: "100vh",
  },
  card: {
    backgroundColor: "#333",
    color: "white",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: "10px",
  },
  price: {
    fontWeight: "bold",
    color: "#ff9800",
  },
}));

export default function TicketPage() {
  const classes = useStyles();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const savedTickets = localStorage.getItem("ticketDetails");
  
    try {
      const parsedTickets = JSON.parse(savedTickets);
      
      // Ensure tickets is always an array
      setTickets(Array.isArray(parsedTickets) ? parsedTickets : []);
    } catch (error) {
      console.error("Error parsing ticketDetails from localStorage:", error);
      setTickets([]); // Fallback to an empty array
    }
  }, []);
  

  if (tickets.length === 0) return <Typography>No tickets found.</Typography>;

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Tickets
      </Typography>
      <Grid container spacing={2}>
        {tickets.map((ticket, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6">{ticket.movie.title}</Typography>
                <Typography>Customer: {ticket.customer.firstName} {ticket.customer.lastName}</Typography>
                <Typography>Tickets: {ticket.ticketCount}</Typography>
                <Typography>Cinema: {ticket.cinema.id}</Typography>
                <Typography className={classes.price}>
                  Total: ${ticket.totalPrice}
                </Typography>
                <Typography>Payment Method: {ticket.paymentMethod}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
