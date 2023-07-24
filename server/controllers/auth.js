const User = require('../models/User')


const register = async (req, res) => {
    const user = await User.create
    res.status(400).json({user: {name: user.name} })
    res.send('Registration Successful')
    res.send(req.body)
}

const login = (req, res) => {
    const { accountNo, password } = req.body

    // const user = await User.findOne({accountNo});

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