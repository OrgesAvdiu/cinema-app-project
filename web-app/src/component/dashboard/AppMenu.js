import React from "react";
import CategoryIcon from "@material-ui/icons/Category";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import PersonIcon from "@material-ui/icons/Person";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import AppMenuItem from "./AppMenuItem";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import useUser from "../../hooks/useUser";

const appMenuItems = [
  { name: "Dashboard", link: "/admin/dashboard", icon: <FastfoodIcon /> },
  { name: "Tickets", link: "/admin/movieDetail", icon: <CategoryIcon /> },
  { name: "Admins", link: "/admin/admins", icon: <PersonIcon /> },
  { name: "Customers", link: "/admin/customers", icon: <PersonIcon /> },
  { name: "City", link: "/admin/city", icon: <CategoryIcon /> },
  { name: "Offers", link: "/admin/offers", icon: <FastfoodIcon /> },
  { name: "Cinema", link: "/admin/cinemas", icon: <CategoryIcon /> },
  { name: "Movies", link: "/admin/movies", icon: <FastfoodIcon /> },
  { name: "Room", link: "/admin/rooms", icon: <CategoryIcon /> },
  { name: "Category", link: "/admin/categories", icon: <CategoryIcon /> },
];

export default function AppMenu() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setUser } = useUser();

  function handleLogOut() {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/client/home", { replace: true });
  }

  return (
    <SimpleBar
      style={{
        height: `calc(100% - ${theme.toolbarHeight}px)`,
        overflowX: "hidden",
        backgroundColor: "#222", // Dark sidebar background
        padding: "1rem",
      }}
    >
      <List component="nav">
        {appMenuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => navigate(item.link)}
            style={{
              color: "#fff",
              backgroundColor: "transparent",
              borderRadius: "8px",
              marginBottom: "5px",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#333")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <ListItemIcon style={{ color: "#fff" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}

        {/* Logout Button */}
        <ListItem
          key={-1}
          onClick={handleLogOut}
          button
          style={{
            color: "#fff",
            marginTop: "10px",
            borderRadius: "8px",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#700")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <ListItemIcon style={{ color: "#fff" }}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </SimpleBar>
  );
}
