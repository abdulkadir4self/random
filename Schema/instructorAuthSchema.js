const mongoose = require('mongoose');

const instructorAuthSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model('instructorAuth' , instructorAuthSchema);
