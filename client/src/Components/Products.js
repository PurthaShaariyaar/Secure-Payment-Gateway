import React, { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Typography, Button, IconButton, Select, MenuItem, Grid } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import TShirtImage from "../Assets/shirt.png";
import JeansImage from "../Assets/jeans.png";
import HoodieImage from "../Assets/hoodie.png";
import { Link } from 'react-router-dom';
import { FiArrowRight } from "react-icons/fi";


const Products = ({ cart, setCart, handleQuantityChange, removeFromCart, quantitySelector, setQuantitySelector }) => {


  // Dummy data for clothes
  const clothesData = [
    {
      id: 1,
      title: "T-Shirt",
      price: 15,
      image: TShirtImage,
      sizes: ["S", "M", "L"],
    },
    {
      id: 2,
      title: "Jeans",
      price: 30,
      image: JeansImage,
      sizes: ["S", "M", "L"],
    },
    {
      id: 3,
      title: "Hoodie",
      price: 25,
      image: HoodieImage,
      sizes: ["S", "M", "L"],
    },
    {
      id: 4,
      title: "T-Shirt",
      price: 15,
      image: TShirtImage,
      sizes: ["S", "M", "L"],
    },
    {
      id: 5,
      title: "Jeans",
      price: 30,
      image: JeansImage,
      sizes: ["S", "M", "L"],
    },
    {
      id: 6,
      title: "Hoodie",
      price: 25,
      image: HoodieImage,
      sizes: ["S", "M", "L"],
    },
    {
      id: 7,
      title: "T-Shirt",
      price: 15,
      image: TShirtImage,
      sizes: ["S", "M", "L"],
    },
    {
      id: 8,
      title: "Jeans",
      price: 30,
      image: JeansImage,
      sizes: ["S", "M", "L"],
    },
    {
      id: 9,
      title: "Hoodie",
      price: 25,
      image: HoodieImage,
      sizes: ["S", "M", "L"],
    },
    {
      id: 10,
      title: "T-Shirt",
      price: 15,
      image: TShirtImage,
      sizes: ["S", "M", "L"],
    },
    {
      id: 11,
      title: "Jeans",
      price: 30,
      image: JeansImage,
      sizes: ["S", "M", "L"],
    },
    {
      id: 12,
      title: "Hoodie",
      price: 25,
      image: HoodieImage,
      sizes: ["S", "M", "L"],
    },
    // Add more clothes data as needed
  ];


  const defaultSize = "S";
  const initialSizeSelector = {};
  clothesData.forEach((clothes) => {
    initialSizeSelector[clothes.id] = defaultSize;
  });
  const [sizeSelector, setSizeSelector] = useState(initialSizeSelector);

  const totalItemsInCart = cart.reduce((total, item) => total + (item.quantity || 0), 0);

  const addToCart = (item) => {
    const newItem = {
      ...item,
      size: sizeSelector[item.id] || "No Size Selected", // Default size if no size is selected
      quantity: quantitySelector[item.id] || 1
    };
    setCart([...cart, newItem]);
  };


  const handleSizeChange = (event, itemId) => {
    const newSizeSelector = { ...sizeSelector, [itemId]: event.target.value };
    setSizeSelector(newSizeSelector);
  };

  const handleProductQuantityChange = (itemId, action) => {
    console.log("Item ID:", itemId);
    console.log("Action:", action);

    const updatedQuantitySelector = { ...quantitySelector };

    if (!updatedQuantitySelector[itemId]) {
      updatedQuantitySelector[itemId] = 0;
    }

    updatedQuantitySelector[itemId] = action === "increase" ? updatedQuantitySelector[itemId] + 1 : updatedQuantitySelector[itemId] - 1;

    console.log("Updated Quantity Selector:", updatedQuantitySelector);

    setQuantitySelector(updatedQuantitySelector);
  };


  return (
    <div className="products-page">
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: 'darkblue', fontSize: '3rem' }} gutterBottom>
        Products
      </Typography>
      <Link to="/cart" className="secondary-button-view-cart">
        View Cart ({totalItemsInCart}) <FiArrowRight />{" "}
      </Link>
      <Grid container spacing={3}>
        {clothesData.map((clothes) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={clothes.id}>
            <Card className="product-card">
              <CardMedia
                component="img"
                height="200"
                style={{ width: "100px", height: "100px" }} // Set width and height explicitly
                image={clothes.image}
                alt={clothes.title}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {clothes.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  ${clothes.price.toFixed(2)}
                </Typography>

                <Select
                  value={sizeSelector[clothes.id] || ""}
                  onChange={(e) => handleSizeChange(e, clothes.id)}
                  className="size-selector"
                >
                  {clothes.sizes.map((size) => (
                    <MenuItem key={size} value={size}>{size}</MenuItem>
                  ))}
                </Select>
                <div className="quantity-container">
                  <IconButton
                    aria-label="remove"
                    onClick={() => handleProductQuantityChange(clothes.id, "decrease")}
                    disabled={!quantitySelector[clothes.id] || quantitySelector[clothes.id] === 1}
                  >
                    <Remove />
                  </IconButton>
                  <Typography variant="body1" className="quantity-text">
                    {quantitySelector[clothes.id] || 0}
                  </Typography>
                  <IconButton
                    aria-label="add"
                    onClick={() => handleProductQuantityChange(clothes.id, "increase")}
                  >
                    <Add />
                  </IconButton>
                </div>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToCart({ ...clothes, size: sizeSelector[clothes.id], quantity: quantitySelector[clothes.id] || 1, price: clothes.price })}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => removeFromCart(clothes.id)}
                >
                  Remove from Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;