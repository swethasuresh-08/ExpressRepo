
const mongoose =require('mongoose')

//String is url to connect to mongodb server
const dbString='mongodb+srv://swethasuresh08:2Ns9StIPOedjtCTF@cluster0.plebrmw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

//Mongoose.connect returns a promise
mongoose.connect(dbString,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connected to my DB")
}).catch((e)=>{
    console.log("Some error occured",e)
})