const User = require('../models/User')
const express = require('express')
const app = express()

const register = async (req, res) => {
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
    const newUser = new User(
        {
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
        });
        
        const savedUser = await newUser.save();
        res.json({ message: 'Registration Successful', user: savedUser});
    // const user = await User.create

    // res.status(400).json({user: {name: user.name} })
    // res.send('Registration Successful')
    // res.send(req.body)
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