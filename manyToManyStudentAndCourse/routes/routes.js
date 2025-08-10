const express=require("express")
const JunctionRouter=express.Router()
const {addCourse,addStudent,enrollStudent,deleteCourse,deleteStudent,activeCourses,activeStudents}=require("../controllers/Enrollment.controller")

JunctionRouter.post("/students",addStudent)

JunctionRouter.post("/courses",addCourse)

JunctionRouter.post("/enroll",enrollStudent)

JunctionRouter.delete("/students/:studentId",deleteStudent)

JunctionRouter.delete("/courses/:courseId",deleteCourse)

JunctionRouter.get("/students/:studentId/courses",activeCourses)

JunctionRouter.get("/courses/:courseId/students",activeStudents)

module.exports=JunctionRouter