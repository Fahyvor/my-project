const User = require('../models/User')
const express = require('express')
const app = express()

app.use(express.json())

const register = async (req, res) => {
    // const user = User.create(req.body);
    // res.status(200).json({ user });
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

        if (!firstname || !lastname || !middlename || !phone || !email || !address || !PIN || !password || !confirmPassword) {
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
    const { accountNo, password } = req.body

    const user = await User.findOne({accountNo});

    // compare password
    if(!accountNo) {
        throw new ('Invalid login details');
    }

    if( accountNo || password ) {
        throw new ('Please provide Account number and Password')
    }
    res.status(400).json('Login Successful')
}

module.exports = {
    register,
    login
}

// https://nigerianbanks.xyz/