const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    firstname: {
        type:String,
    },
    lastname: {
        type:String,
    },
    middlename: {
        type:String,
    },
    username: {
        type:String,
        minlength:3,
        maxlength:50,
    },
    phone: {
        type:String,

    },
    email: {
        type:String,
        required:[true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique:true,
    },
    address: {
        type:String,
        required:[true, 'Please provide a contact address'],
        minlength:3,
        maxlength:80,
    },
    PIN: {
        type:Number,
        required:[true, 'Please provide a pin'],
        minlength:4,
    },
    password: {
        type:String,
        required:[true, 'Please provide a password'],
        minlength:6,
    },
    confirmPassword: {
        type:String,
        required:[true, 'Please provide password'],
        minlength:6,
    },
})

// UserSchema.pre('save', async function(next){
//     if(!this.isModified('password')) {
//         return next();
//     }
    
//     const salt = await bcrypt.genSalt(10);
//     this.PIN = await bcrypt.hash(this.PIN, salt);
//     this.password = await bcrypt.hash(this.password, salt);
//     this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt);
// })
UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function() {
    return jwt.sign({userId:this._id, name:this.name}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    })
}

module.exports = mongoose.model('User', UserSchema)