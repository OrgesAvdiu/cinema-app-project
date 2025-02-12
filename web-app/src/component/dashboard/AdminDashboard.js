import { useState } from "react";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function AdminDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`flex min-h-screen transition-all ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <Container maxWidth="lg" className="p-6">
        {/* Dark Mode Toggle */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        <Grid container spacing={3}>
          {/* Line Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              className="p-4 rounded-xl shadow-md"
              style={{ backgroundColor: darkMode ? "#1E1E1E" : "#fff", color: darkMode ? "#fff" : "#000" }}
            >
              <Typography variant="h6">Revenue Growth</Typography>
              <LineChart
                xAxis={[{ scaleType: "point", data: ["Jan", "Feb", "Mar", "Apr"] }]}
                series={[{ data: [5000, 7000, 8000, 12000], color: darkMode ? "#90caf9" : "#1976d2" }]}
              />
            </Paper>
          </Grid>

          {/* Bar Chart */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              className="p-4 rounded-xl shadow-md"
              style={{ backgroundColor: darkMode ? "#1E1E1E" : "#fff", color: darkMode ? "#fff" : "#000" }}
            >
              <Typography variant="h6">Orders Per Month</Typography>
              <BarChart
                xAxis={[{ scaleType: "band", data: ["Jan", "Feb", "Mar", "Apr"] }]}
                series={[{ data: [30, 50, 70, 90], color: darkMode ? "#ff9800" : "#f57c00" }]}
              />
            </Paper>
          </Grid>

          {/* Pie Chart */}
          <Grid item xs={12}>
            <Paper
              className="p-4 rounded-xl shadow-md"
              style={{ backgroundColor: darkMode ? "#1E1E1E" : "#fff", color: darkMode ? "#fff" : "#000" }}
            >
              <Typography variant="h6">User Distribution</Typography>
              <PieChart
                series={[
                  {
                    data: [
                      { value: 40, label: "Admins", color: darkMode ? "#4caf50" : "#2e7d32" },
                      { value: 60, label: "Users", color: darkMode ? "#ffeb3b" : "#fbc02d" },
                    ],
                  },
                ]}
              />
            </Paper>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box pt={4} className="text-center text-gray-500 dark:text-gray-400">
          <Typography variant="body2">
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
              Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </div>
  );
}
