const fs=require('fs')

const users=[{
    id:1,
    name:"kumar"
}]

const products=JSON.parse(fs.readFileSync('data.json','utf-8'))
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

const getUsers=(req,res)=>{
    res.send(users)
}

const updateUsersByPost=(req,res)=>{
    const newUser=req.body
   // console.log(newUser)
   if(!newUser.name)
    {
        res.status(400).json({error:"Please add user"})
    }
    else{
    if(users.length==0)
        users.push(newUser)
    else{    
    const idNew=users[users.length-1].id+1
    newUser.id=idNew
    users.push(newUser)
    res.send("Ends ")}
    }
}


const deleteUsersById=(req,res)=>{
    const idToBeDeleted=req.params.id
    const userIndex=users.findIndex((user)=>user.id!==idToBeDeleted)
    users.splice(userIndex,1)

    res.send("User deleted successfully")
}

const getAllProducts=(req,res)=>{

    res.send(products)
}
//console.log(products)
//Add an auth middleware, so that request before hitting 
// the server check if that the user is authenticated

//This is how we grab express parameter -- dynamic
const getAllProductsById=(req,res)=>{
    const paramId=req.params.id
    const resultProduct=products.find(product=>JSON.stringify(product.id)===paramId)
   // console.log(resultProduct)
   if(resultProduct==undefined)
    res.status(200).json(resultProduct)
   else
   res.status(404).send("Product not found")
    
}

const deleteProductById=(req,res)=>{
    const productId=req.params.productId
    const productIdIndex=products.findIndex(product=>JSON.stringify(product.id)===productId)
    products.splice(productIdIndex,1)
    res.status(201).send("Product deleted successfully")
}
const addProductByPost=(req,res)=>{
    const product=req.body
    products.push(product)
    fs.writeFileSync('data.json',JSON.stringify(products),'utf-8')
    res.status(200).json(product)
}

const updateProductByPut=(req,res)=>{
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
}

const productPatchUpdate=(req,res)=>{
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
 
}

const productDeleteBody=(req,res)=>{
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
 
}

module.exports={
    authenticate,
    getUsers,
    updateUsersByPost,
    deleteUsersById,
    getAllProducts,
    getAllProductsById,
    deleteProductById,
    addProductByPost,
    updateProductByPut,
    productPatchUpdate,
    productDeleteBody

}