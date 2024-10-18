const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
    },
    studentId: {
        type: Number,
    },
    courses: {
        type: [
            {
                courseName:  String, 
                courseId: String,
            }
        ],
    }
});



module.exports = mongoose.model('student', studentSchema);