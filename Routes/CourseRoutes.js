const express = require('express');
const courseSchema = require('../Schema/CourseSchema.js');
const router = express.Router();
const upload = require('../middlewares/FileUploadMW.js');



router.post('/' ,upload.single('coursePic') ,async (req,res)=>{
    let { crsName , crsLevel, crsDescription, crsId } = req.body;
try {
  const createCourse = await  courseSchema.create({
    name : crsName,
    courseId : crsId,
    // level : crsLevel,
    // description : crsDescription,
    // coursePic : req.fileNewName,
  })
  res.json({
    status: 1,
    message: 'course created successfully',
    data: createCourse,
  })
} 
catch (error) {
  console.log(error);
  res.json({
    status: 0,
    message: 'course could not be created',
    data: null,
  })
}
})

router.get('/' , async function(req,res){
  try {
    let allCourse = await courseSchema.find({});
    res.json({
      status:1,
      message: 'Fetched course Successfully',
      data: allCourse,
    })
    
  } 
  catch (error) {
    res.json({
      status:0,
      message: 'Fetching course Failed',
      data: null,
    })
  }
})

router.get('/:id' , async function(req,res){
  try {
  let singleCourse = await courseSchema.findById(req.params.id)
  res.json({
    status:1,
    message:' single course fetched successfully',
    data: singleCourse,
  })
  } 
  catch (error) {
    res.json({
      status:0,
      message:' single course fetching failed',
      data: null
    })
  }
})

router.delete('/:id' , async function(req,res){
  try {
  let deletedCourse = await courseSchema.findByIdAndDelete(req.params.id);
  res.json({
    status:1,
    message:'course deleted successfully',
    data: deletedCourse
  })  
  } 
  catch (error) {
    res.json({
      status:0,
      message:'course could not be deleted ',
      data: null
    })  
  }
})


// PUT route to add student to course
router.put('/:id/add-student', async (req, res) => {
    try {
        const courseId = req.params.id;
        const { name, studentId } = req.body;

        // Find the course by ID
        let course = await courseSchema.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if the number of students is already at the limit
        if (course.students.length >= 30) {
            return res.status(400).json({ message: 'Student limit reached' });
        }

        // Push new student to the array
        course.students.push({ name, studentId });

        // Save the course with the new student
        await course.save();

           // Retrieve the course with the full students array
           course = await courseSchema.findById(courseId); // refetch to get updated data

        res.status(200).json({ message: 'Student added successfully', course });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;


// router.put('/:id' , async function(req,res){
//   try {
//     let { crsName , crsLevel, crsDescription, } = req.body;
//     let updatedCourse = await courseSchema.findByIdAndUpdate(req.params.id , {
//         name : crsName,
//         level : crsLevel,
//         description : crsDescription,
//     } , {new: true} , {insert:true})
//     res.json({
//       status:1,
//       message: 'course updated successfully',
//       data: updatedCourse
//     })
    
//   } 
//   catch (error) {
//     res.json({
//       status:0,
//       message: 'course could not updated ',
//       data: null
//     })
//   }
// })

module.exports = router;