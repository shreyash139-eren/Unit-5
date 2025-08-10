const StudentModel=require("../models/student.model")
const CourseModel=require("../models/course.model")
const EnrollmentModel=require("../models/enrollment.model")

//add student
const addStudent=async(req,res)=>{
    try {
        await StudentModel.create(req.body)
        res.status(201).json({message:"Student added"})
    } catch (error) {
        res.status(500).json({message:"Somethng Went Wrong"})        
    }
}

//addCourse
const addCourse=async(req,res)=>{
    try {
        await CourseModel.create(req.body)
        res.status(201).json({message:"Course added"})
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

//enroll 

const enrollStudent=async(req,res)=>{
    try {
        const {studentId,courseId}=req.body
        let student=await StudentModel.findById(studentId)
        let course=await CourseModel.findById(courseId)
        if(!student || !course){
            return res.status(404).json({message:"Student or Course not found"})
        }
        if(student.isActive===false){
            return res.status(400).json({message:"Student is not active"})
        }
        if(course.isActive===false){
            return res.status(400).json({message:"Course is not active"})
        }
        await EnrollmentModel.create(req.body)
        res.status(201).json({message:"Student enrolled"})
    } catch (error) {
        res.status(500).json({message:"something went wrong"})
    }
}

//soft delete student

const deleteStudent=async(req,res)=>{
    try {
        const {studentId}=req.params
        let student=await StudentModel.findById(studentId)

        if(!student){
            return res.status(404).json({message:"Student not found"})
        }

        student.isActive=false
        await student.save()

        await EnrollmentModel.updateMany({studentId},{$set:{isActive:false}})
        res.status(200).json({message:"Student deleted"})
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

//soft delete course

const deleteCourse=async(req,res)=>{
    try {
        const {courseId}=req.params
        let course=await CourseModel.findById(courseId)
        if(!course){
            return res.status(404).json({message:"course not found"})
        }
        if(course.isActive===false){
            return res.status(400).json({message:"course not found"})
        }
        course.isActive=false
        await course.save()
        await EnrollmentModel.updateMany({courseId},{$set:{isActive:false}})
        res.status(200).json({message:"Course deleted"})
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

//active courses for student

const activeCourses=async(req,res)=>{
    try {
        // console.log(12)
        const {studentId}=req.params
        // console.log(13)
        let courses=await EnrollmentModel.find({studentId})
        // console.log(14)
        courses=courses.map((ele)=>ele.courseId)
        courses = await Promise.all(courses.map((id)=>
             CourseModel.findById(id))
          )
        courses=courses.filter((ele)=>ele.isActive===true)
        // console.log(courses)
        res.status(200).json({message:"Courses",courses})
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

const activeStudents=async(req,res)=>{
    try {
        const {courseId}=req.params
        let student=await EnrollmentModel.find({courseId})
        student=student.map((ele)=>ele.studentId)
        student=await Promise.all(student.map((ele)=>
            StudentModel.findById(ele)))
        student=student.filter((ele)=>ele.isActive===true)

        res.status(200).json({message:"Students list",student})
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

module.exports={addCourse,addStudent,enrollStudent,deleteCourse,deleteStudent,activeCourses,activeStudents}