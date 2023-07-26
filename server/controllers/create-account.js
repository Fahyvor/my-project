const express = require('express')
const app = express()

const createAccount = async (req, res) => {
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

    res.json(req.body);
}

module.exports = {createAccount}