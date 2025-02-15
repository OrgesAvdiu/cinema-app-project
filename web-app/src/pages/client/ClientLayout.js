import React from "react";
import MuiAppBar from "../../component/MuiAppBar";
import { IconButton } from "@material-ui/core";
import HomePage from "./HomePage";

export default function ClientLayout() {
  return (
    <div style={{ 
      backgroundColor: "#191919",  // Dark background
      color: "white",            // White text for contrast
      minHeight: "100vh",        // Ensure full viewport coverage
      display: "flex",
      flexDirection: "column"
    }}>
      <MuiAppBar />
      <HomePage />
      <IconButton color="inherit">
      </IconButton>
    </div>
  );
}
