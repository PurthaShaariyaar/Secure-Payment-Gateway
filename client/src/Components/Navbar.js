/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { Typography } from "@mui/material";
const Navbar = ({ cart }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const totalItemsInCart = cart.reduce((total, item) => total + (item.quantity || 0), 0);

  const menuOptions = [

    {
      text: "Products",
      icon: <CommentRoundedIcon />,
      path: "/products"
    },

    {
      text: "Login",
      icon: <PhoneRoundedIcon />,
      path: "/login"
    },
    {
      text: "Sign Up",
      icon: <ShoppingCartRoundedIcon />,
      path: "/signup"
    },
  ];
  return (
    <nav>
      <div className="nav-logo-container">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black', fontSize: '3rem' }}>
            SECURE GATEWAY
          </Typography>
        </Link>
      </div>
      <div className="navbar-links-container">
        {menuOptions.map((item, index) => (
          <Link key={index} to={item.path}>{item.text}</Link>
        ))}
        <Link to="/cart">
          <BsCart2 className="navbar-cart-icon" />
          {totalItemsInCart > 0 && <span className="cart-item-count">{totalItemsInCart}</span>}
        </Link>
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
