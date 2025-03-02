import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Link,
  makeStyles,
  Typography,
  Box,
  IconButton,
  InputBase,
  useTheme,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import SearchIcon from "@material-ui/icons/Search";
import { useQuery } from "react-query";
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
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: "1.5rem",
    color: theme.palette.secondary.main,
    textDecoration: "none",
    margin: theme.spacing(1),
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1),
    },
  },
  link: {
    color: "#b0b0b0",
    margin: theme.spacing(0, 1.5),
    textDecoration: "none",
    transition: "color 0.3s ease",
    fontSize: "0.875rem",
    "&:hover": {
      color: "white",
      textDecoration: "none",
    },
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1),
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
  searchInput: {
    backgroundColor: "white",
    color: "black",
    border: "none",
    borderRadius: "4px",
    padding: theme.spacing(0.5),
    marginRight: theme.spacing(1),
    width: "0px",
    paddingLeft: "0px",
    paddingRight: "0px",
    transition: "width 0.5s ease-out, padding 0.5s ease-out",
    "&:focus": {
      outline: "none",
    },
  },
  searchInputOpen: {
    width: "200px",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    border: `2px solid black`,
  },
  searchButton: {
    color: "#b0b0b0",
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
    backgroundColor: "black",
    color: "white",
    marginTop: theme.spacing(4),
    transform: "translateY(40%)",
  },
  menuItem: {
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.background.paper,
    },
  },
  categoryLink: {
    color: "#b0b0b0",
    margin: theme.spacing(0, 1.5),
    textDecoration: "none",
    transition: "color 0.3s ease",
    fontSize: "0.875rem",
    "&:hover": {
      color: "white",
      textDecoration: "none",
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
  const [searchOpen, setSearchOpen] = useState(false);

  const { data: categoryData } = useQuery(QueryKeys.CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData);
    }
  }, [categoryData]);

  const handleLogOut = () => {
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
    setSearchOpen((prev) => !prev);
  };

  return (
    <AppBar position="static" elevation={0} className={classes.appBar}>
      <Box className={classes.leftNav}>
        <Typography
          variant="h4"
          noWrap
          className={classes.toolbarTitle}
          component={RouterLink}
          to={"/client/home"}
        >
          CINEMA
        </Typography>

        <Link
          variant="button"
          onClick={handleCategoryClick}
          className={`${classes.link} ${classes.categoryLink}`}
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
          classes={{ paper: classes.menu }}
        >
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <MenuItem
                key={category.id}
                component={RouterLink}
                to={`/client/category/${category.id}`}
                onClick={handleCloseMenu}
                className={classes.menuItem}
              >
                {category.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled className={classes.menuItem}>
              No Categories Available
            </MenuItem>
          )}
        </Menu>
      </Box>

      <Box className={classes.rightNav}>
        <IconButton onClick={handleSearchToggle} className={classes.searchButton}>
          <SearchIcon />
        </IconButton>
        <InputBase
          placeholder="Search..."
          className={`${classes.searchInput} ${searchOpen ? classes.searchInputOpen : ""}`}
          inputProps={{ "aria-label": "search" }}
        />
        {user ? (
          <Button color="primary" variant="contained" className={classes.link} onClick={handleLogOut}>
            Log out
          </Button>
        ) : (
          <Button color="primary" variant="contained" className={classes.link} component={RouterLink} to="/client/sign-in">
            Sign In
          </Button>
        )}
      </Box>
    </AppBar>
  );
}
