const express = require('express');
const bodyParser = require('body-parser');
const rsa = require('node-rsa');
const cors = require('cors');
const fs = require('fs');

require('dotenv').config();

const app = express();
app.use(cors());
const PORT = 4001;

const cardBalances = {
    '1234567890123456': 1000,
    '1234567890123457': 0,
};

// Load private key from the environment variable or file
const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'utf8');
const key = new rsa(privateKey);

app.use(bodyParser.json());

app.post('/checkFunds', (req, res) => {
    const { encryptedCardNumber, totalPrice } = req.body;

    try {
        const cardNumber = key.decrypt(encryptedCardNumber, 'utf8');
        const availableBalance = cardBalances[cardNumber];
        const success = availableBalance >= totalPrice;

        res.json({ success });
    } catch (error) {
        console.error('Error decrypting card number:', error);
        res.status(500).send('Error during decryption');
    }
});

app.listen(PORT, () => {
    console.log(`Bank Service running on port ${PORT}`);
});
