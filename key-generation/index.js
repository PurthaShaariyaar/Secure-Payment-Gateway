const NodeRSA = require('node-rsa');
const fs = require('fs');

// Generate a new RSA key pair
const key = new NodeRSA({b: 512});

// Export the private key
const privateKey = key.exportKey('private');
fs.writeFileSync('private.key', privateKey);

// Export the public key
const publicKey = key.exportKey('public');
fs.writeFileSync('public.key', publicKey);

console.log('Keys generated successfully.');
