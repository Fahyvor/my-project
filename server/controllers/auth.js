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
    const { username, password } = req.body

    const user = await User.findOne({username});

    try {
        if(!username) {
            throw new ('Invalid login details');
        }
    
        if( !username || !password ) {
            throw new ('Please provide Account number and Password')
        }

        // compare password
        if( password !== User.password) {
            throw new('Incorrect password')
        }

        res.status(400).json('Logged in Successfully')

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred during registration.' });
    }
    
}


module.exports = {
    register,
    login,
}