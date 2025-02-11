import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Link,
  makeStyles,
  Typography,
  Box,
  IconButton,
  TextField,
  useTheme,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import DarkModeIcon from '@material-ui/icons/Brightness4';
import LightModeIcon from '@material-ui/icons/Brightness7';
import SearchIcon from '@material-ui/icons/Search'; // Import search icon
import { useQuery } from "react-query"; // For fetching categories
import { QueryKeys } from "../services/QueryKeys";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    background: theme.palette.primary.main,
    color: "BLACK",
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    fontFamily: "monospace",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
    textDecoration: "none",
    margin: theme.spacing(1),
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1),
    },
  },
  link: {
    color: theme.palette.secondary.main,
    margin: theme.spacing(1, 1.5),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1),
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
  searchInput: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `2px solid white`, // Underline effect
    borderRadius: "4px",
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "200px", // Adjust the width as needed
    "&:focus": {
      outline: "none", // Remove the outline on focus
    },
  },
  searchButton: {
    color: "red", // Make the search icon red
  },
  leftNav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rightNav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexGrow: 1,
  },
  menu: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    marginTop: theme.spacing(4),
    transform: "translateY(40%)",
  },
  menuItem: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.background.paper,
    },
  },
}));

export default function MuiAppBar() {
  const classes = useStyles();
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const theme = useTheme();
  const [categories, setCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false); // State to toggle search input visibility

  // Fetching categories using react-query with QueryKeys
  const { data: categoryData, isLoading: categoriesLoading, isError: categoriesError } = useQuery(QueryKeys.CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData); // Update categories from the fetched data
    }
  }, [categoryData]);

  const handleLogOut = () => {
    console.log("Logging out...");
    localStorage.removeItem("user");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("lines");
    setUser(null);
    navigate("/client/home");
  };

  const handleCategoryClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSearchToggle = () => {
    setSearchOpen((prev) => !prev); // Toggle the search input visibility
  };

  return (
    <AppBar position="static" elevation={0} className={classes.appBar}>
      <Box className={classes.leftNav}>
        <Typography
          variant="h6"
          noWrap
          className={classes.toolbarTitle}
          component={RouterLink}
          to={"/client/home"}
        >
          Cinema
        </Typography>

        <Link
          variant="button"
          to="/client/cinemas"
          component={RouterLink}
          className={classes.link}
        >
          Cinemas
        </Link>

        <Link
          variant="button"
          onClick={handleCategoryClick}
          className={classes.link}
        >
          Categories
        </Link>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          MenuListProps={{
            onMouseLeave: handleCloseMenu,
          }}
        >
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <MenuItem
                key={category.id}
                component={RouterLink}
                to={`/client/category/${category.id}`}
                onClick={handleCloseMenu}
              >
                {category.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No Categories Available</MenuItem>
          )}
        </Menu>
      </Box>

      <Box className={classes.rightNav}>
        {/* Search Icon Button (Red color) */}
        <IconButton
          onClick={handleSearchToggle}
          className={classes.searchButton}
        >
          <SearchIcon />
        </IconButton>

        {/* Search Bar (only visible when searchOpen is true) */}
        {searchOpen && (
          <TextField
            variant="outlined"
            placeholder="Search..."
            className={classes.searchInput}
            size="small"
          />
        )}

        {user ? (
          <Button
            color="primary"
            variant="contained"
            className={classes.link}
            onClick={handleLogOut}
          >
            Log out
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
            className={classes.link}
            component={RouterLink}
            to="/client/sign-in"
          >
            Sign In
          </Button>
        )}
      </Box>
    </AppBar>
  );
}
