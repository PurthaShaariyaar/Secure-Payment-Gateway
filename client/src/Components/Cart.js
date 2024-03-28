import React from "react";
import { Typography, Button, Grid, Card, CardMedia, CardContent, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { FiArrowRight } from "react-icons/fi";

const Cart = ({ cart, removeFromCart, handleQuantityChange, quantitySelector }) => {
    // Function to calculate total price

    console.log("Hi")
    console.log(cart)
    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => {
            console.log("Item in cart: ", item);
            const itemPrice = item.price * (quantitySelector[item.id] || 0);
            console.log("quantitySelector[item.id] : " + quantitySelector[item.id])

            console.log("itemPrice: " + itemPrice)
            return total + itemPrice;
        }, 0);
    };

    return (
        <div className="cart-page">
            <Typography variant="h4">Shopping Cart</Typography>
            <Link to="/payment" className="secondary-button-view-cart">
                Proceed to Payment <FiArrowRight />{" "}
            </Link>
            {cart.length === 0 ? (
                <Typography variant="body1">Your cart is empty.</Typography>
            ) : (
                <Grid container spacing={2}>
                    {cart.map((item) => (
                        <Grid item xs={12} key={item.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    style={{ width: "100px", height: "100px" }} // Set width and height explicitly

                                    image={item.image}
                                    alt={item.title}
                                />
                                <CardContent>
                                    <Typography variant="h6">{item.title}</Typography>
                                    <Typography variant="body2">Price: ${item.price.toFixed(2)}</Typography>
                                    <Typography variant="body2">Size: {item.size}</Typography>
                                    <div className="quantity-container">
                                        <IconButton
                                            aria-label="remove"
                                            onClick={() => handleQuantityChange(item.id, "decrease")}
                                            disabled={!quantitySelector[item.id] || quantitySelector[item.id] === 1}
                                        >
                                            <Remove />
                                        </IconButton>
                                        <Typography variant="body2" className="quantity-text">
                                            {quantitySelector[item.id] || 1}
                                        </Typography>
                                        <IconButton
                                            aria-label="add"
                                            onClick={() => handleQuantityChange(item.id, "increase")}
                                        >
                                            <Add />
                                        </IconButton>
                                    </div>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Remove
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Typography variant="h6">Total: ${calculateTotalPrice().toFixed(2)}</Typography>
                    </Grid>
                </Grid>
            )}
        </div>
    );
};

export default Cart;
