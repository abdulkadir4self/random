const express = require('express');
const studentSchema = require('../Schema/StudentSchema');
// const courseSchema = require('../Schema');
const router = express.Router();



router.post('/'  , async (req,res)=>{
    let { stuName , stuId , stuCourse } = req.body;
try {
  const createstudent = await studentSchema.create({
    studentName : stuName,
    studentId: stuId,
    courses : stuCourse,
  })
  res.json({
    status: 1,
    message: 'student created successfully',
    data: createstudent,
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
    let allstudent = await studentSchema.find({});
    res.json({
      status:1,
      message: 'student fetched Successfully',
      data: allstudent,
    })
    
  } 
  catch (error) {
    res.json({
      status:0,
      message: 'Fetching student Failed',
      data: null,
    })
  }
})

router.get('/:id' , async function(req,res){
    try {
    let singlestudent = await studentSchema.findById(req.params.id)
    res.json({
      status:1,
      message:' single student fetched successfully',
      data: singlestudent,
    })
    } 
    catch (error) {
      res.json({
        status:0,
        message:' single student fetching failed',
        data: null
      })
    }
  })

  router.delete('/:id' , async function(req,res){
    try {
    let deletedstudent = await studentSchema.findByIdAndDelete(req.params.id);
    res.json({
      status:1,
      message:'student deleted successfully',
      data: deletedstudent
    })  
    } 
    catch (error) {
      res.json({
        status:0,
        message:'student could not be deleted ',
        data: null
      })  
    }
  })


module.exports = router;