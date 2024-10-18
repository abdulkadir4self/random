const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
    courseName:{
        type: String,
        required : true
    },
    lectureName:{
        type: String,
        required : true
    },
    date:{
        type: Date,
        required : true
    },
    instructor : {
        type : mongoose.Schema.Types.String,
        ref: 'instructor'
    }
})

module.exports = mongoose.model('lecture' , lectureSchema);