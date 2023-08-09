const User = require('../models/User')
const express = require('express')
const app = express()

app.use(express.json())

const register = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            middlename,
            username,
            phone,
            email,
            address,
            PIN,
            password,
            confirmPassword
        } = req.body;

        if (!firstname || !lastname || !middlename ||!username || !phone || !email || !address || !PIN || !password || !confirmPassword) {
            return res.status(400).json({ error: 'Please provide all required fields.' });
        }


        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'A user with this email already exists.' });
        }
    

            const user = await User.create({ ...req.body })
        
        // const token = user.createJWT();
        res.json({ message: "Registration Successful", user})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred during registration.' });
    }
    
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if both username and password are provided
        if (!username || !password) {
            throw new Error('Please provide username and password');
        }

        // Find the user by username
        const user = await User.findOne({ username });

        // Check if the user exists
        if (!user) {
            throw new Error('Invalid login details');
        }

        // Compare the password using user's stored password hash
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            throw new Error('Incorrect password');
        }

        // Successful login
        res.status(200).json({ message: 'Logged in successfully' });

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    register,
    login,
}