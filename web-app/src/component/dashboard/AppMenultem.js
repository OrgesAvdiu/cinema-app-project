import React, { useState } from "react";
import AppMenuItemComponent from "./AppMenuItemComponent";
import { Collapse, List, ListItemIcon, ListItemText } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { useTheme } from "@material-ui/core/styles";

export default function AppMenuItem({
  divider,
  name,
  link,
  items = [],
  extraPadding,
}) {
  const [open, setOpen] = useState(false);
  const isExpandable = items && items.length > 0;
  const theme = useTheme();
  
  function handleClick() {
    setOpen(!open);
  }

  const MenuItemRoot = (
    <AppMenuItemComponent
      extraPadding={extraPadding}
      link={link}
      onClick={handleClick}
      divider={!!divider}
      style={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <ListItemText primary={name} style={{ color: theme.palette.text.primary }} />
      {isExpandable && !open && (
        <ExpandMoreIcon style={{ color: theme.palette.text.primary }} />
      )}
      {isExpandable && open && (
        <ExpandLessIcon style={{ color: theme.palette.text.primary }} />
      )}
    </AppMenuItemComponent>
  );

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider style={{ backgroundColor: theme.palette.divider }} />
      <List component="div" disablePadding>
        {items.map((item, index) => (
          <AppMenuItem {...item} key={index} extraPadding />
        ))}
      </List>
    </Collapse>
  ) : null;

  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  );
}
