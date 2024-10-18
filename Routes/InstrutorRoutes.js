const express = require('express');
const instructorSchema = require('../Schema/InstructorSchema');
const studentSchema = require('../Schema/StudentSchema');
const courseSchema = require('../Schema/CourseSchema');

const router = express.Router();
// console.log(instructorSchema);



router.post('/'  , async (req,res)=>{
    let { insName , insId , insSalary, insDesignation, insPhone, insEmail , insCourse } = req.body;
try {
  const createInstructor = await instructorSchema.create({
    teacherName : insName,
    teacherId: insId,
    courses : insCourse,
    // salary: insSalary,
    // designation: insDesignation,
    // phone: insPhone,
    // email: insEmail,
  })
  res.json({
    status: 1,
    message: 'instructor created successfully',
    data: createInstructor,
  })
} 
catch (error) {
  console.log(error);
  res.json({
    status: 0,
    message: 'intructor could not be created',
    data: null,
  })
}
})

router.get('/' , async function(req,res){
  try {
    let allInstructor = await instructorSchema.find({});
    res.json({
      status:1,
      message: 'Instructor fetched Successfully',
      data: allInstructor,
    })
    
  } 
  catch (error) {
    res.json({
      status:0,
      message: 'Fetching Instructor Failed',
      data: null,
    })
  }
})

router.get('/:id' , async function(req,res){
  try {
  let singleInstructor = await instructorSchema.findById(req.params.id)
  res.json({
    status:1,
    message:' single Instructor fetched successfully',
    data: singleInstructor,
  })
  } 
  catch (error) {
    res.json({
      status:0,
      message:' single Instructor fetching failed',
      data: null
    })
  }
})

router.delete('/:id' , async function(req,res){
  try {
  let deletedInstructor = await instructorSchema.findByIdAndDelete(req.params.id);
  res.json({
    status:1,
    message:'Instructor deleted successfully',
    data: deletedInstructor
  })  
  } 
  catch (error) {
    res.json({
      status:0,
      message:'instructor could not be deleted ',
      data: null
    })  
  }
})




// PUT route to add a course to a teacher's courses array
router.put('/:id/add-course', async (req, res) => {
    try {
        const teacher = await instructorSchema.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Check if the teacher already has 5 courses
        if (teacher.courses.length >= 5) {
            return res.status(400).json({ message: 'Course limit reached' });
        }

        // Add the new course from the request body
        teacher.courses.push(req.body);

        // Save the updated teacher
        await teacher.save();

        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// const Teacher = require('./models/Teacher'); // Teacher model
// const Student = require('./models/Student'); // Student model

// PUT route to add a student to a course
router.put('/:teacherId/:courseId/:courseName/student/:studentId', async (req, res) => {
    try {
        // Fetch the teacher
        const teacher = await instructorSchema.findById(req.params.teacherId);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Find the course the teacher is teaching
        const course = teacher.courses.find(c => c.courseName === req.params.courseName);
        if (!course) {
            return res.status(400).json({ message: 'You are not teaching this course' });
        }

        // Fetch the student from the Student model
        const student = await studentSchema.findById(req.params.studentId);
        const stName = student.studentName
        
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Check if the student is already added to the course
        // const isStudentAlreadyAdded = course.students.includes(student._id.toString());
        // if (isStudentAlreadyAdded) {
        //     return res.status(400).json({ message: 'Student is already added to this course' });
        // }
        let courseHere = await courseSchema.findById(req.params.courseId);
        console.log(courseHere);
        
        // Add the student to the course
        courseHere.students.push(stName);

        // Add the course to the student schema
        // studentSchema.courses.push(course);

        // Save the updated teacher document
        await teacher.save();
        await courseHere.save();

        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




// router.put('/:id' , async function(req,res){
//   try {
//     let { insName , insSalary, insDesignation, insPhone, insEmail } = req.body;
//     let updatedInstructor = await instructorSchema.findByIdAndUpdate(req.params.id , {
//     name : insName,
//     salary: insSalary,
//     designation: insDesignation,
//     phone: insPhone,
//     email: insEmail,
//     } , {new: true} , {insert:true})
//     res.json({
//       status:1,
//       message: 'Instructor updated successfully',
//       data: updatedInstructor
//     })
    
//   } 
//   catch (error) {
//     res.json({
//       status:0,
//       message: 'Instructor could not updated ',
//       data: null
//     })
//   }
// })




module.exports = router;