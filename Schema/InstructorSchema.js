const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    teacherName: {
        type: String,
    },
    teacherId: {
        type: Number,
    },
    courses: {
        type: [
            {
                courseName:  String, 
                courseId: String,
            }
        ],
        validate: [arrayLimit, '{PATH} exceeds the limit of 5'],
    }
});

// Custom validation function to check the limit of the courses array
function arrayLimit(val) {
    return val.length <= 5;
}

module.exports = mongoose.model('Teacher', teacherSchema);



// const teacherSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     courses: {
//         type: [String], // Array of course names or course IDs
//         validate: {
//             validator: function (v) {
//                 return v.length <= 5; // Ensures that the array has a max length of 5
//             },
//             message: 'A teacher cannot be assigned to more than 5 courses'
//         }
//     }
// });

// module.exports = mongoose.model('Teacher', teacherSchema);

// const mongoose = require('mongoose');

// const instructorSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required : true
//     },
//     salary:{
//         type: Number,
//         required : true
//     },
//     designation:{
//         type: String,
//         required : true
//     },
//     phone:{
//         type: Number,
//         required : true
//     },
//     email:{
//         type: String,
//         required : true
//     },
// })

// module.exports = mongoose.model('instructor' , instructorSchema);