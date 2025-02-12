import React, { forwardRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ListItem } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { useTheme } from "@material-ui/core/styles";

export default function AppMenuItemComponent({
  onClick,
  link,
  divider,
  children,
}) {
  const location = useLocation();
  const theme = useTheme();

  if (divider) {
    return <Divider style={{ backgroundColor: theme.palette.divider }} />;
  }

  // If link is not set, return the ordinary ListItem
  if (!link) {
    return (
      <ListItem
        button
        selected={location.pathname === link}
        children={children}
        onClick={onClick}
        style={{
          backgroundColor: location.pathname === link ? theme.palette.action.selected : "transparent",
          color: theme.palette.text.primary,
        }}
      />
    );
  }

  // Return a ListItem with a NavLink component
  return (
    <ListItem
      button
      selected={location.pathname === link}
      children={children}
      component={forwardRef((props, ref) => (
        <NavLink {...props} ref={ref} />
      ))}
      to={link}
      onClick={onClick}
      style={{
        backgroundColor: location.pathname === link ? theme.palette.action.selected : "transparent",
        color: theme.palette.text.primary,
        textDecoration: "none",
      }}
    />
  );
}
