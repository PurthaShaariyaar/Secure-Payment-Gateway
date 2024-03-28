const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const rsa = require('node-rsa');
const cors = require('cors');
const fs = require('fs');

require('dotenv').config();

const app = express();
app.use(cors());
const PORT = 4000;

// Load public key from the environment variable or file
const publicKey = fs.readFileSync(process.env.PUBLIC_KEY_PATH, 'utf8');
const key = new rsa(publicKey);

app.use(bodyParser.json());

app.post('/processPayment', async (req, res) => {
    const { cardNumber, expiryDate, cvv, totalPrice } = req.body;

    try {
        const encryptedCardNumber = key.encrypt(cardNumber, 'base64');
        const encryptedExpiryDate = key.encrypt(expiryDate, 'base64');
        const encryptedCvv = key.encrypt(cvv, 'base64');

        const bankServiceUrl = 'http://bank-srv:4001/checkFunds';
        const requestData = {
            encryptedCardNumber,
            totalPrice
        };

        const response = await axios.post(bankServiceUrl, requestData); // Wait for the response
        const paymentStatus = response.data.success ? 'Payment completed' : 'Insufficient funds';
        res.send(paymentStatus);
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Payment Service running on port ${PORT}`);
});
