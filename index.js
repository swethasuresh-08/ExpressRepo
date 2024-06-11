const express=require('express')
const fs=require('fs')

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
const products=JSON.parse(fs.readFileSync('data.json','utf-8'))
//console.log(products)

app.get('/products',(req,res)=>{

    res.send(products)
})

app.post('/products/add',(req,res)=>{
    const product=req.body
    products.push(product)
    fs.writeFileSync('data.json',JSON.stringify(products),'utf-8')

    res.status(200).json(product)
})
//UPDATE ALWAYS FOLLOW UPSERT CONCEPT -- Update and Insert
app.put('/products/update-complete',(req,res)=>{
    const productToUpdate=req.body
    const productId=products.findIndex((product)=>product.id===productToUpdate.id)

      if(productId===-1)
        products.push(productToUpdate)
    else
    {
        products[productId]=productToUpdate
    }
    fs.writeFileSync("data.json",JSON.stringify(products),'utf-8')
    res.status(200).json(productToUpdate)
})

app.patch('/products/update-field',(req,res)=>{
    const productToUpdate=req.body
    const productId=products.findIndex((product)=>product.id===productToUpdate.id)
//    console.log("Product id is -------"+productId)
    if(productId===-1)
        res.status(404)
    else
    {
    products[productId]=productToUpdate
    }
    fs.writeFileSync("data.json",JSON.stringify(products),'utf-8')
    res.status(200).json(productToUpdate)
    //console.log(productId)
 
})

app.delete('/products/delete',(req,res)=>{
    const productId=req.body.id
    const productIndexDelete=products.findIndex((product)=>product.id==productId)
     //console.log("Product id is "+productIndexDelete + " "+productId)
    if(productIndexDelete===-1)
    {
        res.status(404)
    }
    else
    {
    products.splice(productIndexDelete,1)
    }
    fs.writeFileSync("data.json",JSON.stringify(products),'utf-8')
    res.status(200).json(productId)
    //console.log(productId)
 
})
app.listen(PORT,(req,res)=>{
   
    console.log('Server has started')
})