const express=require('express')
const productRouter=require('./Routes/productRoutes')


const PORT=8080

const app=express()

//This is how i say use this middleware
//app.use(MiddleWare Name)

app.use(express.json())
app.use('/',productRouter.router)


app.listen(PORT,(req,res)=>{
   
    console.log('Server has started')
})