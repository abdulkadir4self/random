const express = require('express');
const lectureSchema = require('../Schema/LectureSchema');
const router = express.Router();

router.post('/'  , async (req,res)=>{
    let { lctCourseName , lctLectureName , lctDate } = req.body;
try {
  const createLecture = await  lectureSchema.create({
    courseName : lctCourseName,
    lectureName : lctLectureName,
    date: lctDate
  })
  res.json({
    status: 1,
    message: 'lecture created successfully',
    data: createLecture,
  })
} 
catch (error) {
  console.log(error);
  res.json({
    status: 0,
    message: 'lecture could not be created',
    data: null,
  })
}
})
 
router.put('/:id' , async function(req,res){
  try {
    let {  lctInstructor } = req.body;
    let updatedLecture = await lectureSchema.findByIdAndUpdate(req.params.id , {
      instructor : lctInstructor,
    } , {new: true} , {insert:true})
    res.json({
      status:1,
      message: 'lecture updated successfully',
      data: updatedLecture
    })
    
  } 
  catch (error) {
    res.json({
      status:0,
      message: 'lecture could not updated ',
      data: null
    })
  }
})



router.get('/' , async function(req,res){
  try {
    let allLecture = await lectureSchema.find({});
    res.json({
      status:1,
      message: 'lectures fetched Successfully',
      data: allLecture,
    })
    
  } 
  catch (error) {
    res.json({
      status:0,
      message: 'Fetching lecture Failed',
      data: null,
    })
  }
})


module.exports = router;
