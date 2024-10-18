const express = require('express');
const app = express();
const port_No = 5005;
const mongoose = require('mongoose');
const cors = require('cors');
const authMiddleWare = require('./middlewares/AuthMW');
require('dotenv').config(); //to load environment varibales
const BASE_URL = process.env.BASE_URL //api/v1
console.log(BASE_URL);
// process.env.BASE_URL

mongoose.connect(process.env.MONGODB_LINK)
.then(function(){
    console.log('OLS db connected sucessfully');
})
.catch(function(){
    console.log('OLS db is not connected');
})

app.use( cors() );
app.use('/coursePic' , express.static('uploads'))
app.use(express.json());
app.use(express.urlencoded({extended:true}))


// checking index.js
app.get('/test' , (req,res)=>{
  res.send('index.js is working just fine')
})

// instructor routes starts here
const studentRoutes = require('./Routes/StudentRoutes');
app.use('/student' , studentRoutes);

// instructor routes starts here
const instructorRoutes = require('./Routes/InstrutorRoutes');
app.use('/instructor' , authMiddleWare , instructorRoutes);  // base_URl = api/v1

// course routes starts here
const courseRoutes = require('./Routes/CourseRoutes');
app.use('/course' , authMiddleWare , courseRoutes);

// lecture routes starts here
const lectureRoutes = require('./Routes/LectureRoutes');
app.use('/lecture' , authMiddleWare , lectureRoutes);

const LectureSchema = require('./Schema/LectureSchema');
//auth routes start here
const authRoutes = require('./Routes/AuthRoutes');
app.use('/auth', authRoutes );

//instructor Auth start here
const instructorAuthRoutes = require('./Routes/InstructorAuthRoutes');
app.use( '/instructor-auth', instructorAuthRoutes );

//to assign instructor 
app.get('/check' , async (req,res)=>{
    try {
            const lecturesWithInstructors = await LectureSchema.find({ instructor: { $exists: true } }).populate('instructor');
            console.log(lecturesWithInstructors);
            if (lecturesWithInstructors.length > 0) {
              const instructorData = lecturesWithInstructors.map(lecture => lecture.instructor);
              console.log('Instructor data found:', instructorData);
              return { success: true, data: instructorData };
            } else {

              console.log('No instructor data found.');
              return { success: false, message: 'No instructor data found.' };
            }
        } 
        catch (error) {
          res.status(500).json({ message: error.message });
        }
      
})

app.listen(port_No , function(){
    console.log(`The server is running on ${port_No}`);
})