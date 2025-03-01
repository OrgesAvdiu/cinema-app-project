import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  button: {
    marginTop: theme.spacing(1),
    color: "#ff9800",
  },
}));

export default function TicketPage() {
  const classes = useStyles();
  const [tickets, setTickets] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editedTicket, setEditedTicket] = useState(null);
  const [editedTicketDetails, setEditedTicketDetails] = useState({
    movieTitle: "",
    customerFirstName: "",
    customerLastName: "",
    ticketCount: "",
    totalPrice: "",
    paymentMethod: "",
  });

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

  // Handle Delete action
  const deleteTicket = (index) => {
    const updatedTickets = tickets.filter((_, i) => i !== index);
    setTickets(updatedTickets);
    localStorage.setItem("ticketDetails", JSON.stringify(updatedTickets));
  };

  // Handle Edit action
  const handleEdit = (ticket, index) => {
    setEditedTicket(ticket);
    setEditedTicketDetails({
      movieTitle: ticket.movie.title,
      customerFirstName: ticket.customer.firstName,
      customerLastName: ticket.customer.lastName,
      ticketCount: ticket.ticketCount,
      totalPrice: ticket.totalPrice,
      paymentMethod: ticket.paymentMethod,
    });
    setOpenDialog(true);
  };

  // Handle Save Edit
  const saveEdit = () => {
    const updatedTickets = [...tickets];
    const index = tickets.indexOf(editedTicket);

    updatedTickets[index] = {
      ...editedTicket,
      movie: { ...editedTicket.movie, title: editedTicketDetails.movieTitle },
      customer: {
        ...editedTicket.customer,
        firstName: editedTicketDetails.customerFirstName,
        lastName: editedTicketDetails.customerLastName,
      },
      ticketCount: editedTicketDetails.ticketCount,
      totalPrice: editedTicketDetails.totalPrice,
      paymentMethod: editedTicketDetails.paymentMethod,
    };

    setTickets(updatedTickets);
    localStorage.setItem("ticketDetails", JSON.stringify(updatedTickets));
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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
                <Typography>
                  Customer: {ticket.customer.firstName} {ticket.customer.lastName}
                </Typography>
                <Typography>Tickets: {ticket.ticketCount}</Typography>
                <Typography>Cinema: {ticket.cinema.id}</Typography>
                <Typography className={classes.price}>
                  Total: ${ticket.totalPrice}
                </Typography>
                <Typography>Payment Method: {ticket.paymentMethod}</Typography>

                <Button
                  className={classes.button}
                  onClick={() => handleEdit(ticket, index)}
                >
                  Edit
                </Button>
                <Button
                  className={classes.button}
                  onClick={() => deleteTicket(index)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Ticket Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Ticket</DialogTitle>
        <DialogContent>
          <TextField
            label="Movie Title"
            value={editedTicketDetails.movieTitle}
            onChange={(e) =>
              setEditedTicketDetails({
                ...editedTicketDetails,
                movieTitle: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Customer First Name"
            value={editedTicketDetails.customerFirstName}
            onChange={(e) =>
              setEditedTicketDetails({
                ...editedTicketDetails,
                customerFirstName: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Customer Last Name"
            value={editedTicketDetails.customerLastName}
            onChange={(e) =>
              setEditedTicketDetails({
                ...editedTicketDetails,
                customerLastName: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Ticket Count"
            type="number"
            value={editedTicketDetails.ticketCount}
            onChange={(e) =>
              setEditedTicketDetails({
                ...editedTicketDetails,
                ticketCount: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Total Price"
            type="number"
            value={editedTicketDetails.totalPrice}
            onChange={(e) =>
              setEditedTicketDetails({
                ...editedTicketDetails,
                totalPrice: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Payment Method"
            value={editedTicketDetails.paymentMethod}
            onChange={(e) =>
              setEditedTicketDetails({
                ...editedTicketDetails,
                paymentMethod: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={saveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
