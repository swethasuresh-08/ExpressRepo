
const mongoose = require('mongoose')

//String is url to connect to mongodb server
const dbString = 'mongodb+srv://swethasuresh08:2Ns9StIPOedjtCTF@cluster0.plebrmw.mongodb.net/scaler-database?retryWrites=true&w=majority&appName=Cluster0'

//Mongoose.connect returns a promise
mongoose.connect(dbString, {}).then(() => {
    console.log("connected to my DB")
}).catch((e) => {
    console.log("Some error occured", e)
})
//Define a Schema
const courseSchema=new mongoose.Schema({
    name:String,
    creator:String,
    isPublished:Boolean,
    rating:Number,
    isPublishedDate:{
        type:Date,
        default:Date.now
    }
})

//Create a model -- basically document(row)
const Course=mongoose.model('Course',courseSchema)

async function createCourse()
{
    const courses=new Course({
        name:'JavaScript Advance',
        creator:'Tara',
        isPublished:false,
        rating:4.9
    })
    await courses.save()
}
//createCourse()
async function getCourse()
{
    const course=await Course.find({creator:'Tara' })
    console.log(course)
}
//getCourse()
async function updateCourse(courseId)
{
    const course=await Course.findById(courseId)
    if(!course)
        {
            console.log("Course not found")
            return
        }
    course.rating=5
    await course.save()
    console.log('Course Updated')
}
//updateCourse('666acff393d348b9b99fd45a')

async function deleteCourse(courseId)
{
    const courseDeleted=await Course.findByIdAndDelete(courseId)
    console.log(courseDeleted)
}
deleteCourse('666acff393d348b9b99fd45a')