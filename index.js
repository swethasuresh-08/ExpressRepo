const express=require('express')

const PORT=8080

const users=[{
    id:1,
    name:"kumar"
}]
const app=express()
app.use(express.json())

//Add an auth middleware, so that request before hitting 
// the server check if that the user is authenticated
const authenticate=(req,res,next)=>{
    const password=req.headers.password
    console.log(password)
    if(password==="test")
        {
            next()
        }
    else
    {
        res.status(401).json({error:"Your not authorized"})
    }
}

//This is how i say use this middleware
//app.use(authenticate)

app.get("/",(req,res)=>{
    res.send("Hello Express")
})

//This is how we grab a query parameter
app.get("/about",(req,res)=>{
    console.log(req.query.page)
res.send("This is About API")
})

//This is how we grab express parameter -- dynamic
app.get("/product/:id",(req,res)=>{
    const paramId=req.params
    console.log(paramId)
    console.log(req.query)
    res.send("Dynamic id")
})

app.get("/users",(req,res)=>{
    res.send(users)
})

app.post("/users/add",authenticate,(req,res)=>{
    const newUser=req.body
   // console.log(newUser)
   if(!newUser.name)
    {
        res.status(400).json({error:"Please add user"})
    }
    else{
    const idNew=users[users.length-1].id+1
    newUser.id=idNew
    users.push(newUser)
    res.send("Ends ")}
})

app.delete("/users/delete/:id",(req,res)=>{
    const idToBeDeleted=req.params.id
    const userIndex=users.findIndex((user)=>user.id!==idToBeDeleted)
    users.splice(userIndex,1)

    res.send("User deleted successfully")
})

app.listen(PORT,(req,res)=>{
   
    console.log('Server has started')
})