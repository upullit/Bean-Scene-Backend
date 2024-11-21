const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../Database/Menu/models/User');
const jwt = require('jsonwebtoken');



//User Registration 
router.post('/register', async (req, res) => 
{ const { username, password } = req.body;
    if (!username || !password) 
        {
        return res.status(400).send({ 
            message: 'Username and password are required' });
        }

    try {
        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = crypto.scryptSync(password, salt, 32).toString('hex');

        const user = new User({
            username,
            pwordhash: hashedPassword,
            salt,
        });

    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
    } catch (err) {
    res.status(500).send({ message: 'Error registering user', error: err.message });
    }
});


// User Login 
router.post('/login', async (req, res) => { 
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
    const reqHashedPassword = crypto.scryptSync(password, user.salt, 32).toString('hex');

    if (reqHashedPassword !== user.pwordhash) {
        return res.status(401).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });
    res.status(200).send({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).send({ message: 'Error logging in', error: err.message });
    }
});

// Token Authentication 
router.post('/auth', (req, res) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).send({ message: 'Access denied' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"
    if (!token) {
        return res.status(401).send({ message: 'Access denied' });
    }

    try {
        const verified = jwt.verify(token, 'your_secret_key'); // Replace with your actual secret key
        res.status(200).send({ message: 'Token is valid', user: verified });
    } catch (err) {
        console.error(err);
        res.status(403).send({ message: 'Invalid token', error: err.message });
    }
});

module.exports = router;