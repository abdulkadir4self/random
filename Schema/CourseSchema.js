const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    courseId: {
        type: String,
        // required: true
    },
    students: {
        type: [{
            name: { type: String,  },
            studentId: { type: String, }
        }],
        validate: {
            validator: function (v) {
                return v.length <= 30;
            },
            message: 'The number of students cannot exceed 30'
        }
    }
});

module.exports = mongoose.model('Course', courseSchema);




// const mongoose = require('mongoose');

// const courseSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required : true
//     },
//     courseId:{
//         type: String,
//         required : true
//     },

//     // level:{
//     //     type: String,
//     //     required : true
//     // },
//     // description:{
//     //     type: String,
//     //     required : true
//     // },
//     // coursePic:{
//     //     type: String,
//     //     required: true,
//     // },
// })

// module.exports = mongoose.model('course' , courseSchema);